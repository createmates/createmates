const aws = require('aws-sdk');
const router = require("express").Router();

const formidable = require('formidable')
const fs = require('fs');

const { User, Session } = require('../db/models');
if (process.env.NODE_ENV === "development") require('../../secrets');
module.exports = router;


const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DIGITAL_OCEAN_SPACES_API_ACCESS_KEY,
    secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET,
    region: 'nyc3'
});


router.post('/upload/Session',  async function(req, res, next) {
  try {

    const form = new  formidable.IncomingForm();

    // Parse `req` and upload all associated files
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
            if (err) {
              console.log(err, err.stack);
              throw err
            }
            else    {
              //returns an eTag
              
              res.sendStatus(201)
            } 
          });
      })
    });
  } catch (err){
    next(err)
  }
})

router.post('/upload/:userId',  async function(req, res, next) {
  try {
    let profileToUpdate = await User.findByPk(req.params.userId)

    //formidable is middleware that can read out the formdata recieved from the front end - multer can do a simplier thing
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
            if (err) {
              console.log(err, err.stack);
              throw err
            }
            else    {
              //returns an eTag
             
              // updating the user information in the database
              profileToUpdate.update({
                photoPath: `https://createmates.nyc3.digitaloceanspaces.com/${files[firstFileName].name}`,
                photoEtag: returnData.ETag,  //not sure if this is something we would ever need
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




  