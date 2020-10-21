import React from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'

class ProfilePhoto extends React.Component {
  constructor() {
    super()
    this.state = {
      profilePic: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

handleSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log("Event.target: ", event.target)
    const pic = event.target.value
    console.log("Pic: ", pic)
    await axios.post(`/spaces/upload`, pic)
  } catch (err) {
    console.error(err)
  }
}

render () {
  return (
    this.state.profilePic.name ? <p>We have a pic</p> : 
    <form method="post" encType="multipart/form-data" onSubmit={this.handleSubmit} action="/spaces/upload" >
      <label htmlFor="file">Upload file</label>
      <input type="file" name="upload" />
      <button type="submit">Submit</button>
    </form>
    )
  }
}

export default ProfilePhoto;
