import React from 'react'
import {connect} from 'react-redux'
import {savePhotoThunk} from '../store/user'

 class ProfilePhoto extends React.Component {
   constructor() {
     super()

     this.state = {
       profilePhoto: '',
       fileName: ""
     }

     this.handleSubmit = this.handleSubmit.bind(this)
   }
   


  componentDidMount() {
    this.setState({
      profilePhoto: this.props.user.profilePhoto

    })
  }

uploadedImage = React.createRef(null);
imageUploader = React.createRef(null);



  handleImageUpload = event => {
    const [file] = event.target.files;

    if(file) {
       this.setState({
        fileName: file.name
       })

      const reader = new FileReader();
      const {current} = this.uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  // handleChange (event) {
  //   this.setState({
  //     file: URL.createObjectURL(event.target.files[0])
  //   })
  // }

  handleSubmit(event) {
    event.preventDefault()
    const userPhoto = this.state.fileName
    const userId = this.props.user.id
    this.props.savePhoto({profilePhoto: userPhoto}, userId)
  }

render (){
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}
    >
    <div>
      <button onClick={this.handleSubmit}>Save Photo</button>
    </div>
      <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg" onChange={this.handleImageUpload} ref={this.imageUploader}  style={{
        display: "none"
      }}
      />

      <div
        style={{
          height: "60px",
          width: "60px",
          border: "1px dashed black"
        }}
        onClick={() => this.imageUploader.current.click()}
      >
      <img ref={this.uploadedImage} style={{
        width: "100px", height: "100px", position: "absolute"
      }}
      />
      </div>
      Click to upload Image
    </div>
  )
}
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    savePhoto: (userPhoto, userId) => {
      dispatch(savePhotoThunk(userPhoto, userId))
    }
  }
}



export default connect(mapState, mapDispatch)(ProfilePhoto)
