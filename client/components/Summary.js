import React from "react";
import {connect} from 'react-redux';
import socket from "../socket";
import { sessionSummary } from "../store";
import {updateSessionThunk} from '../store/openSessions'
import { roomId } from "./Session";
import {resetVideo} from '../store/videos'

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
        const updatedSesson = {
            id: this.props.session.id,
            status: 'closed',
            summary: this.props.session.summary
        }
        this.props.updateSession(updatedSesson);
        this.props.history.push('/feed')
        socket.emit('closeSession', roomId)
       this.props.resetVideo()
    }

    render() {
        return (
            <div>
                <h1>What did you create today?</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="summary">Summary: </label>
                    {!this.props.session.summary 
                    ?<input onChange={this.handleChange} type="textarea" name="summary" placeholder="Write a couple of sentences about what you created"/>
                    :<input onChange={this.handleChange} type="textarea" name="summary" value={this.props.session.summary} />
                    }
                    <button type="submit">Save Session</button>
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