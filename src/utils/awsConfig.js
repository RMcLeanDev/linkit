import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET,
  region: 'us-west-2'
});

const s3 = new AWS.S3();

export default s3;