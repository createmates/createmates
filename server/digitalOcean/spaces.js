// const aws = require('aws-sdk');
// const router = require("express").Router();
// module.exports = router;

// const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
// const s3 = new aws.S3({
//     endpoint: spacesEndpoint,
//     accessKeyId: process.env.DIGITAL_OCEAN_SPACES_API_ACCESS_KEY,
//     secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET,
//     region: 'nyc3'
// });

// router.post('/upload', async (req, res, next) => {
//   const selectedFile = req.body;
//   console.log(selectedFile)
//   try {
//     const params = {
//       Bucket: "createmates",
//       Key: selectedFile.name,
//       Body: selectedFile,
//       ACL: 'public-read'
//     };
//     await s3.putObject(params, function(err, data) {
//       if (err) console.log(err, err.stack);
//       else     console.log(data);
//     });
//     // this.props.updateUser(this.props.user.id, {profilePhoto: `https://createmates.nyc3.digitaloceanspaces.com/${selectedFile.name}`})
//   } catch (err) {
//     console.error(err)
//   }
// })
