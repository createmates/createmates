import React from "react";
import {connect} from 'react-redux';
import socket from "../socket";
import { sessionSummary } from "../store";
import {updateSessionThunk} from '../store/openSessions'
import { roomId } from "./Session";
import {resetVideo} from '../store/videos'


export const sessionEndedToast = (partners) => {

    toast(`The session between ${partners[0].username} and ${partners[1].username} has ended`, {
      className: "custom_toast",
      toastClassName: 'toast',
      closeOnClick: true,
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
    })
  }



class Summary extends React.Component {
    constructor() {
        super();
        this.state = {
            summary: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = event => {
        const summaryMessage = {content: event.target.value, roomId}
        this.props.sessionSummary(summaryMessage.content)
        socket.emit('summaryUpdate', summaryMessage)
    }

    handleSubmit() {
        const categoryName = this.props.session.category.split(' ').join('-')
        const updatedSesson = {
            id: this.props.session.id,
            status: 'closed',
            summary: this.props.session.summary,
            image: `/images/${categoryName}.jpg`
        }
        this.props.updateSession(updatedSesson);
        this.props.history.push('/feed')
        const infoToEmit = {
            roomId: roomId,
            partners: this.props.session.users
        }
        socket.emit('closeSession', infoToEmit)
       this.props.resetVideo()
       sessionEndedToast(this.props.session.users)
    }

    render() {
        return (
            <div>
                <h1>What did you create today?</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="summary">Summary: </label>
                    {!this.props.session.summary 
                    ?
                    <textarea
                    onChange={this.handleChange}
                    className="form-control"
                    type="text"
                    name="summary"
                    placeholder="Write a couple of sentences about what you created"
                    />
                    :
                    <textarea
                    onChange={this.handleChange}
                    className="form-control"
                    type="text"
                    name="summary"
                    value={this.props.session.summary}
                    />
                    }
                    <button className="btn btn-info btn-md" type="submit">Save Session</button>
                </form>
            </div>
        )
    }
}

const mapState = state => {
    return {
      session: state.singleSession
    }
  }

  const mapDispatch = dispatch => {
    return {
        updateSession: (updatedSession) => dispatch(updateSessionThunk(updatedSession)),
        sessionSummary: (summary) => dispatch(sessionSummary(summary)),
        resetVideo: () => dispatch(resetVideo())
    }
  }

  export default connect(mapState, mapDispatch)(Summary);
