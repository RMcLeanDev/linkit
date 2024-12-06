import React, { useState } from "react";
import s3 from "../../../constants/awsConfig";
import {v4 as uuidv4} from 'uuid'

function AwsUploads() {
  const [newFile, setNewFile] = useState("");
  const [fileNameToDelete, setFileNameToDelete] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFileToS3 = async (file) => {
    const fileNameParts = file.name.split('.');
    const extension = fileNameParts.pop(); 
    const baseName = fileNameParts.join('.'); 
  
    const uniqueId = uuidv4();
  
    const uniqueFileName = `${baseName}-${uniqueId}.${extension}`;
  
    const params = {
      Bucket: 'linkitphotos',
      Key: uniqueFileName,
      Body: file,
      ContentType: file.type,
    };
  
    try {
      const data = await s3.upload(params).promise();
      console.log('File uploaded successfully:', data.Location);
      return data.Location;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const deleteFileFromS3 = async (fileUrl) => {
    try {
      const urlParts = new URL(fileUrl);
      const bucketName = "linkitphotos"; 
      const key = urlParts.pathname.substring(1);
  
      const params = {
        Bucket: bucketName,
        Key: key,
      };
  
      await s3.deleteObject(params).promise();
      console.log("File deleted successfully:", key);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Handle file input
  const handleNewFile = (e) => {
    setNewFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!newFile) return;

    try {
      const fileUrl = await uploadFileToS3(newFile);
      console.log("Uploaded file URL:", fileUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Handle file delete
  const handleFileDelete = async () => {
    if (!fileNameToDelete) return;

    try {
      await deleteFileFromS3(fileNameToDelete);
      console.log(`Deleted file: ${fileNameToDelete}`);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Upload File</h2>
        <input type="file" onChange={handleNewFile} />
        <button onClick={handleFileUpload}>Upload</button>
        <progress value={uploadProgress} max="100" style={{ width: "100%" }}>
          {uploadProgress}%
        </progress>
      </div>

      <div>
        <h2>Delete File</h2>
        <input
            type="text"
            placeholder="Enter file URL to delete"
            value={fileNameToDelete}
            onChange={(e) => setFileNameToDelete(e.target.value)}
        />
        <button onClick={() => deleteFileFromS3(fileNameToDelete)}>Delete</button>
      </div>
    </div>
  );
}

export default AwsUploads;
