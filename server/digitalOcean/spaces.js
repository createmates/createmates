const aws = require('aws-sdk');
const router = require("express").Router();
// const multer = require('multer')
// const multerS3 = require('multer-s3')
const formidable = require('formidable')
const fs = require('fs');

const { User } = require('../db/models');
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


router.post('/upload/:userId',  async function(req, res, next) {
  try {
    let profileToUpdate = await User.findByPk(req.params.userId)

  //formidable is middleware that can read out the formdata recieved from the front end
    const form = new  formidable.IncomingForm();
    // Parse `req` and upload all associated files
    //parse req into a file object we can use
    form.parse(req,  async function(err, fields, files) {
      if (err) {
          console.log(err)
        return res.status(400).json({ error: err.message });
      }
      const [firstFileName] = Object.keys(files);
  //reads the file into a buffer stream
  fs.readFile(files[firstFileName].path, async function(err, fileData){
    const params = {
        Bucket: "createmates",
        Key: files[firstFileName].name,
        Body: fileData,
        ACL: 'public-read'
      };
      await s3.putObject(params , function(err, returnData) {
        if (err) console.log(err, err.stack);
        else    {
          //returns an eTag
          console.log(returnData);
          // updating the user information in the database
          profileToUpdate.update({
            photoPath: `https://createmates.nyc3.digitaloceanspaces.com/${files[firstFileName].name}`,
            photoEtag: returnData.ETag,
            profilePhoto: files[firstFileName].name
          })
          res.json(profileToUpdate)
        } 
      });
  })
  
     
    });
  } catch (err){
    next(err)
  }
  })
