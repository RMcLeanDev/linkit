import React, { useState, useEffect } from "react";
import s3 from "../../../constants/awsConfig";
import { v4 as uuidv4 } from "uuid";

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handles uploading a file to AWS S3
  const uploadFileToS3 = async (file) => {
    const fileNameParts = file.name.split(".");
    const extension = fileNameParts.pop();
    const baseName = fileNameParts.join(".");

    const uniqueId = uuidv4();
    const uniqueFileName = `${baseName}-${uniqueId}.${extension}`;

    const params = {
      Bucket: "linkitphotos",
      Key: uniqueFileName,
      Body: file,
      ContentType: file.type,
    };

    try {
      const upload = s3.upload(params);

      upload.on("httpUploadProgress", (progress) => {
        const percentage = Math.round((progress.loaded / progress.total) * 100);
        setUploadProgress(percentage);
      });

      const data = await upload.promise();
      console.log("File uploaded successfully:", data.Location);
      return data.Location;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    setIsDragging(false);
    setFiles([]); // Clear selected files
    setUploadProgress(0);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(true);

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileUpload = async () => {
    for (const file of files) {
      try {
        await uploadFileToS3(file);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
    setFiles([]); // Clear the files after upload
    setIsDragging(false);
    setUploadProgress(0);
  };

  const renderPreviews = () => {
    return files.map((file, index) => {
      if (file.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(file);
        return (
          <div key={index} style={{ margin: "10px", textAlign: "center" }}>
            <img
              src={imageURL}
              alt={`preview ${index}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p style={{ fontSize: "12px" }}>{file.name}</p>
          </div>
        );
      } else {
        return (
          <div key={index} style={{ margin: "10px", textAlign: "center" }}>
            <p>📄 {file.name}</p>
          </div>
        );
      }
    });
  };

  useEffect(() => {
    const handleDragEnter = (event) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      if (!event.relatedTarget) {
        setIsDragging(false);
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragleave", handleDragLeave);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  return (
    <div>
      {isDragging && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "80%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ margin: "0 auto" }}>Upload Files</h3>
              <button
                onClick={handleCancel}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                X
              </button>
            </div>
            <p style={{ marginBottom: "20px" }}>
              Drop your files here to upload
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {renderPreviews()}
            </div>
            {files.length > 0 && (
              <>
                <progress
                  value={uploadProgress}
                  max="100"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  {uploadProgress}%
                </progress>
                <button
                  onClick={handleFileUpload}
                  style={{
                    marginTop: "10px",
                    background: "#28a745",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Upload Files
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Drag and drop files onto the screen to upload
      </p>
    </div>
  );
};

export default FileUpload;
