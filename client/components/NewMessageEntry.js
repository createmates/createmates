import React, { Component } from 'react';
import { sendMessage } from '../store/messages'
import { connect } from 'react-redux'

export class NewMessageEntry extends Component {

  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const message = event.target.content.value
    this.props.submitMessage({
      content: message,
      sessionId: this.props.sessionId
    })
    event.target.content.value = '';
  }

  onKeyUp(event) {

    if(event.charCode === 13) {
      const message = event.target.value
      this.props.submitMessage({
      content: message,
      sessionId: this.props.sessionId
   })
   event.target.value = ''
    }
  }

  render () {

    return (
      <div className="form-group">
        <div className="container position-fixed">
          <form className="position-fixed" id="new-message-form" onSubmit={this.handleSubmit} onKeyPress={this.onKeyUp}>
          <textarea
            className="form-control text-dark"
            type="text"
            name="content"
            placeholder="Say something nice..."
            style={{width: '18rem'}}
          />
          <span className="input-group-btn position-fixed">
            <button className="btn btn-info btn-md" type="submit">Chat!</button>
          </span>
          </form>
        </div>

   </div>
    );
  }
}



const mapDispatch = dispatch => ({
  submitMessage: message => dispatch(sendMessage(message))
})

export default connect(null, mapDispatch)(NewMessageEntry)
