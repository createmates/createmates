import React, { Component } from 'react';
import { sendMessage } from '../store/messages'
import { connect } from 'react-redux'
import Message from "./Message"
import './Chat.css'


class Chat extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }


  handleSubmit (event) {
    event.preventDefault()
    const message = event.target.content.value
    this.props.submitMessage({
      content: message,
      sessionId: this.props.session.id
    })
    event.target.content.value = '';
  }


  onKeyUp(event) {

    if(event.charCode === 13) {
      const message = event.target.value
      this.props.submitMessage({
      content: message,
      sessionId: this.props.session.id
   })
   event.target.value = ''
    }
  }


  render () {

    const sessionId = Number(this.props.session.id)
    const messages = this.props.messages
    if(messages.length) {
      const filteredMessages = messages.filter(
          message => message.sessionId === sessionId
      )
      return(
        <div className="chat-box">
        <div className="container-messages">
        <ul >
        {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
        ))}
        </ul>
        </div>
          <form  onSubmit={this.handleSubmit} onKeyPress={this.onKeyUp}>
          <textarea
            className="form-control text-dark"
            type="text"
            name="content"
            placeholder="Say something nice..."
            style={{width: '18rem'}}
          />
          <span className="input-group-btn">
          <button className="btn btn-info btn-md" type="submit">Chat!</button>
        </span>
          </form>
        </div>
      )
    } else {
      return (
        <div className="chat-box">
        <form id="new-message-form" onSubmit={this.handleSubmit} onKeyPress={this.onKeyUp}>
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
    )
    }

  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  session: state.singleSession
})

 const mapDispatch = dispatch => ({
  submitMessage: message => dispatch(sendMessage(message))
})

export default connect(mapStateToProps, mapDispatch)(Chat)
