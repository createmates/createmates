import React from 'react'
import axios from 'axios'
import {updateUserThunk} from '../store/user'
import {connect} from 'react-redux'


class ProfilePhoto extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

 

  handleSubmit = async (event) => {
    event.preventDefault()
    const selectedFile = document.getElementById('file').files[0]
    try {
      const formData = new FormData()
      formData.append('uploadImage', selectedFile)
     const res =  await axios.post(`/spaces/upload/${this.props.user.id}`, formData, { headers: {'Content-Type': 'multipart/form-data'}})

    } catch (err) {
      console.error(err)
    }
  }

render () {
  console.log(this.props.user)
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
    updateUser: (userId, obj) => dispatch(updateUserThunk(userId, obj))
  }
}

export default connect(mapState, mapDispatch)(ProfilePhoto);
