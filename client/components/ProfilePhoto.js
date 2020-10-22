import React from 'react'
import axios from 'axios'
import {updateUserThunk} from '../store/user'
import {connect} from 'react-redux'
const aws = require('aws-sdk');
if (process.env.NODE_ENV === "development") require('../../secrets');

const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DIGITAL_OCEAN_SPACES_API_ACCESS_KEY,
    secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET,
    region: 'nyc3'
});

class ProfilePhoto extends React.Component {
  constructor() {
    super()
    this.state = {
      fileName: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const selectedFile = document.getElementById('file').files[0]
    console.log("selected file: ", selectedFile)
    console.log("selected file.name: ", selectedFile.name)
    try {
      const params = {
        Bucket: "createmates",
        Key: selectedFile.name,
        Body: selectedFile,
        ACL: 'public-read'
      };
      await s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
      });
      // this.props.updateUser(this.props.user.id, {profilePhoto: `https://createmates.nyc3.digitaloceanspaces.com/${selectedFile.name}`})
    } catch (err) {
      console.error(err)
    }
    // await axios.post('/spaces/upload', selectedFile)
  }

render () {
  return (
    <form method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
      <label htmlFor="file">Upload file</label>
      <input id="file" type="file" name="upload" />
      <button type="submit">Submit</button>
    </form>
    )
  }
}

const mapState = state => {
  return {
    user: state.profile
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, obj) => dispatch(userId, updateUserThunk())
  }
}

export default connect(mapState, mapDispatch)(ProfilePhoto);
