import React from 'react'

export class ProfilePhoto2 extends React.Component {
constructor() {
  super()
}
 onChange = (e) => {
    console.log('file to upload:', e.target.files[0])
    let file = e.target.files[0]

    if(file) {
      const reader = new FileReader()

      reader.onload = this.handleReaderLoaded.bind(this)

      reader.readAsBinaryString(file)
    }
  }

 handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result
    this.setState({
      base64TextString: btoa(binaryString)
    })
  }

onFileSubmit = (e) => {
    e.preventDefault()
    const preview = document.getElementById('profile-picture');
    console.log('binary string:', this.state.base64TextString)

    let payload = {image: this.state.base64TextString}
    fetch(`http://localhost:3080/users/${this.props.userid}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
    .then(json => console.log(json))

    preview.src = "data:image/png;base64," + this.state.base64TextString
  }
  render() {
    return (
      <form onSubmit={(e) => this.onFileSubmit(e)}  onChange={(e) => this.onChange(e)}>
        <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg"
        />
        <input type="submit" />
      </form>
    )
  }

}
