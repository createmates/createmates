import React from 'react'
import {connect} from 'react-redux'
import {savePhotoThunk} from '../store/user'


class ProfilePhoto extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

 

  handleSubmit = async (event) => {
    event.preventDefault()
    const selectedFile = document.getElementById('file').files[0]
   this.props.savePhoto(selectedFile, this.props.user.id)
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
    savePhoto: (selectedFile, userId) => dispatch(savePhotoThunk(selectedFile, userId))
  }
}

export default connect(mapState, mapDispatch)(ProfilePhoto);
