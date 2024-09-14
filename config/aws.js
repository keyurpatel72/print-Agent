const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });  // Set your region

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // From your environment variables
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // From your environment variables
//     region: 'us-east-1',  // Adjust this to your S3 bucket region
//   });
//dot env file data
// export AWS_ACCESS_KEY_ID=your_access_key_id
// export AWS_SECRET_ACCESS_KEY=your_secret_access_key

const s3 = new AWS.S3();

// Upload document to S3
exports.uploadDocument = async (file) => {
  const params = {
    Bucket: 'your-s3-bucket-name',
    Key: `documents/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const data = await s3.upload(params).promise();
  return data.Location;  // Return the document URL
};
