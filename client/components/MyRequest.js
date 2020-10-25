import React from 'react'
import {connect} from 'react-redux'
import {deleteSessionThunk, updateSessionThunk, getOpenSessionsThunk} from '../store/openSessions'
import {getMyOpenSessionThunk} from '../store/singleSession'
import {categories} from './Form'
import "./MyRequest.css"

class MyRequest extends React.Component {
  constructor() {
    super()
    this.state = {
      updating: false,
      category: '',
      blurb: '',
      tags: '',
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getMyOpenSession(this.props.user.id)
  }

  handleUpdate(sessionToUpdate){
      const tags = sessionToUpdate.tags.reduce((str, tag) => {
          return str += tag.name + " "
      }, '')
      this.setState({
          updating: true,
          category: sessionToUpdate.category,
          blurb: sessionToUpdate.blurb,
          tags: tags
      })
  }

  handleSubmit(event) {
      const tags = this.state.tags.split(' ')
      const updatedSession = {
          blurb: this.state.blurb,
          category: this.state.category,
          tags: tags,
          id: this.props.myOpenSession.id
      }
      
      this.props.updateSession(updatedSession)
  }

  handleChange = event => {
    const currentKey = event.target.name;
    let value = event.target.value
    this.setState({
      [currentKey]: value
    });
  };

  render() {
    const myOpenSession = this.props.myOpenSession


    if(myOpenSession && myOpenSession.users && myOpenSession.status !== 'closed'){
      return(
        <div>

          <h5 className="mb-0">My Session</h5>
          <div className="p-4 rounded shadow-sm bg-light">
            <p className="mb-0">Status: {myOpenSession.status} </p>
            <p className="mb-0">Medium: {myOpenSession.category}</p>
            <p className="mb-0">{myOpenSession.users[0].username} writes: </p>
            <p>{myOpenSession.blurb}</p>
          <div>
              {myOpenSession.tags && myOpenSession.tags.filter(tag => tag.name !== '').map(tag => (<span key={tag.id}>#{tag.name} </span>))}
          </div>
          {myOpenSession.status === "unmatched"
          ?
          <div>
            <button onClick={() => this.props.deleteSession(myOpenSession)}>Delete</button>
            <button onClick={() => this.handleUpdate(myOpenSession)}>Update</button>
          </div>
          :

            <div>
              <h2 style={{color: 'red'}}>SESSION MATCHED!</h2>
              <a className="nav-link" href="/session">Join Room</a>
            </div>
          }
          {!this.state.updating ? '' :
            <form onSubmit={this.handleSubmit}>
              <select name="category" onChange={this.handleChange} value={this.state.category}>
                {categories.map(category => (
                    <option value={category} key={category}>{category}</option>
                ))}
              </select>
              <div>
                  <label htmlFor="blurb">Write a couple of sentences about what you would like to create: </label>
                  <input
                  type="textarea"
                  name="blurb"
                  value={this.state.blurb}
                  maxLength="75"
                  onChange={this.handleChange}
                  />
                  <label htmlFor="tags">Tags: </label>
                  <input
                  type="text"
                  name="tags"
                  value={this.state.tags}
                  onChange={this.handleChange}
                  />
                  <button type="submit">Go</button>
              </div>
            </form>

          }
        </div>
      </div>
      )
    } else {
      return <div></div>
    }
  }
}

const mapState = state => {
  return {
      myOpenSession: state.singleSession,
      user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
      getMyOpenSession: (userId) => dispatch(getMyOpenSessionThunk(userId)),
      getOpenSessions: () => dispatch(getOpenSessionsThunk()),
      updateSession: (updatedSession) => dispatch(updateSessionThunk(updatedSession)),
      deleteSession: (sessionToDelete) => dispatch(deleteSessionThunk(sessionToDelete))
  }
}

export default connect(mapState, mapDispatch)(MyRequest);

