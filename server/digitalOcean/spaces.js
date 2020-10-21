const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = require("express").Router();
module.exports = router;


aws.config.update({
  secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET,
  accessKeyId: process.env.DIGITAL_OCEAN_SPACES_API_ACCESS_KEY,
  region: 'nyc3'
});

const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');

const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'createmates',
      acl: 'public-read',
      key: function (request, file, cb) {
        console.log(file);
        cb(null, file.originalname);
      }
    })
  }).array('upload', 1);

  router.post('/upload', function (request, response, next) {
    upload(request, response, function (error) {
      if (error) {
        console.log(error);
      } else {
      console.log('File uploaded successfully.');
    }});
  });