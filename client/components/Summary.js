import React from "react";
import {connect} from 'react-redux';
import { sessionSummary } from "../store";
import {updateSessionThunk} from '../store/openSessions'

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
        // this.setState({
        //     [event.target.name] : event.target.value
        // })    
this.props.sessionSummary(event.target.value)
    }

    handleSubmit() {
        const updatedSesson = {
            id: this.props.session.id,
            status: 'closed',
            summary: this.props.session.summary
        }
        this.props.updateSession(updatedSesson);
        this.props.history.push('/feed')
    }

    render() {
        return (
            <div>
                <h1>What did you create today?</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="summary">Summary: </label>
                    <input onChange={this.handleChange} type="textarea" name="summary" placeholder="Write a couple of sentences about what you created"/>
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
        sessionSummary: (summary) => dispatch(sessionSummary(summary))
    }
  }
  
  export default connect(mapState, mapDispatch)(Summary);