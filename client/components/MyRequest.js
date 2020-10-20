import React from 'react'
import {connect} from 'react-redux'
import {deleteSessionThunk, updateSessionThunk} from '../store/openSessions'
import {getMyOpenSessionThunk} from '../store/singleSession'
import {categories} from './Form'

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
      event.preventDefault();
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

      return (
        <div>
          {myOpenSession && myOpenSession.users &&
            <div>
            <h1>My Session</h1>
            <h3>Status: {myOpenSession.status} </h3>
            <h2>{myOpenSession.category}</h2>
            <h3>{myOpenSession.users[0].username} writes: </h3>
            <p>{myOpenSession.blurb}</p>
            <div>
                {myOpenSession.tags.filter(tag => tag.name !== '').map(tag => (<span key={tag.id}>#{tag.name} </span>))}
            </div>
            {myOpenSession.status === "unmatched" ?
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
            {this.state.updating &&
              <form onSubmit={() => this.handleSubmit}>
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
          }
        </div>
      )
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
      updateSession: (updatedSession) => dispatch(updateSessionThunk(updatedSession)),
      deleteSession: (sessionToDelete) => dispatch(deleteSessionThunk(sessionToDelete))
  }
}

export default connect(mapState, mapDispatch)(MyRequest);

