import React from 'react'

export const ProfilePhoto = () => {
  const uploadedImage = React.useRef(null)
  const imageUploader = React.useRef(null)

  const handleImageUpload = event => {
    const [file] = event.target.files;
    if(file) {
      const reader = new FileReader();
      const {current} = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }



  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}
    >
      <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg" onChange={handleImageUpload} ref={imageUploader} style={{
        display: "none"
      }}
      />
      <div
        style={{
          height: "60px",
          width: "60px",
          border: "1px dashed black"
        }}
        onClick={() => imageUploader.current.click()}
      >
      <img ref={uploadedImage} style={{
        width: "100px", height: "100px", position: "absolute"
      }}
      />
      </div>
      Click to upload Image
    </div>
  )
}

