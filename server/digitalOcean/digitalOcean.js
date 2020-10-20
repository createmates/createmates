import AWS from 'aws-sdk';
// const multer = require('multer');
// const multerS3 = require('multer-s3');
/**
 * Digital Ocean Spaces Connection
 */

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.DIGITAL_OCEAN_SPACES_API_ACCESS_KEY,
      secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET
    });
export default s3;