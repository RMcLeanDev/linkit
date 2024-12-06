import s3 from "../constants/awsConfig";
import {v4 as uuidv4} from 'uuid'

//uploading file with unique id
export const uploadFileToS3 = async (file) => {
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

//delete file from s3
export const deleteFileFromS3 = async (fileUrl) => {
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