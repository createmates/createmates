const aws = require('aws-sdk');
const router = require("express").Router();
// const multer = require('multer')
// const multerS3 = require('multer-s3')
const formidable = require('formidable')
if (process.env.NODE_ENV === "development") require('../../secrets');
module.exports = router;

const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DIGITAL_OCEAN_SPACES_API_ACCESS_KEY,
    secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET,
    region: 'nyc3'
});

// const upload = multer({
//     storage: multerS3({
//         s3:s3,
//         bucket: "createmates",
//         ACL: 'public-read',
//         metadata: function(req, file, cb){
//             cb(err, {fieldName: file.fieldname})
//         },
//         key: function(req, file, cb){
//             cb(err, file.originalname)
//         }
//     })
// })

// //POST /spaces/upload
// router.post('/upload', upload.array(), async (req, res, next) => {
//   const selectedFile = req.files;
//   console.log(selectedFile)
//   try {
//     // const params = {
//     //   Bucket: "createmates",
//     //   Key: selectedFile.name,
//     //   Body: selectedFile,
//     //   ACL: 'public-read'
//     // };
//     // await s3.putObject(params, function(err, data) {
//     //   if (err) console.log(err, err.stack);
//     //   else     console.log(data);
//     // });
//     res.send('hello')
//     // this.props.updateUser(this.props.user.id, {profilePhoto: `https://createmates.nyc3.digitaloceanspaces.com/${selectedFile.name}`})
//   } catch (err) {
//     console.error(err)
//   }
// })


router.post('/upload',  async function(req, res) {
    const form = new  formidable.IncomingForm();
    // Parse `req` and upload all associated files
    form.parse(req,  async function(err, fields, files) {
      if (err) {
          console.log(err)
        return res.status(400).json({ error: err.message });
      }
      const [firstFileName] = Object.keys(files);
  console.log(files[firstFileName].name)
  const params = {
        Bucket: "createmates",
        Key: files[firstFileName].name,
        Body: files[firstFileName],
        ACL: 'public-read'
      };
      await s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
      });

      res.json({ filename: firstFileName });
    });
  })
