import React, { useState } from 'react';
import s3 from '../utils/awsConfig';

function AwsUploads() {
  const [newFile, setNewFile] = useState();
  const [progress, setProgress] = useState(0); 
  const [status, setStatus] = useState(''); 

  const uploadFileToS3 = async (file) => {
    const params = {
      Bucket: 'linkitphotos', 
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    try {
      const upload = s3.upload(params);

      upload.on('httpUploadProgress', (event) => {
        if (event.total) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setProgress(progress); 
        }
      });

      const data = await upload.promise();
      console.log('File uploaded successfully:', data.Location);
      setStatus('Upload successful!');
      return data.Location;
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatus('Upload failed.');
      throw error;
    }
  };

  function handleNewFile(e) {
    setNewFile(e.target.files[0]);
  }

  const handleFileUpload = async () => {
    const file = newFile;
    if (!file) return;

    setProgress(0); 
    setStatus('Uploading...'); 

    try {
      const fileUrl = await uploadFileToS3(file);
      console.log('Uploaded file URL:', fileUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleNewFile} />
      <button onClick={handleFileUpload}>Submit</button>
      <progress id="upload-progress" value={progress} max="100" style={{ width: '100%' }}></progress>
      <p>{status}</p>
    </div>
  );
}

export default AwsUploads;
