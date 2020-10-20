// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const router = require("express").Router();
// module.exports = router;

// const spacesEndpoint = new aws.Endpoint('https://createmates.nyc3.cdn.digitaloceanspaces.com');
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint
// });

// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'https://createmates.nyc3.digitaloceanspaces.com',
//       acl: 'public-read',
//       key: function (request, file, cb) {
//         console.log(file);
//         cb(null, file.originalname);
//       }
//     })
//   }).array('upload', 1);

//   router.post('/upload', function (request, response, next) {
//     upload(request, response, function (error) {
//       if (error) {
//         console.log(error);
//         return response.redirect("/error");
//       }
//       console.log('File uploaded successfully.');
//       response.redirect("/success");
//     });
//   });

    // router.post('/upload', function (request, response, next) {
  //   upload(request, response, function (error) {
  //     if (error) {
  //       console.log(error);
  //       return response.redirect("/error");
  //     }
  //     console.log('File uploaded successfully.');
  //     response.redirect("/success");
  //   });
  // });