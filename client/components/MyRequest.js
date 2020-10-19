import React from 'react'
import {connect} from 'react-redux'
import {deleteSessionThunk, updateSessionThunk} from '../store/openSessions'
import {getMyOpenSessionThunk} from '../store/singleSession'
import {categories} from './Form'

class MyRequest extends React.Component {
  constructor() {
    super()
    this.state = {
      updatingId: false,
      category: '',
      blurb: '',
      tags: '',
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getMyOpenSession(this.props.user.id)
  }

   handleUpdate(sessionToUpdate){
        const tags = sessionToUpdate.tags.reduce((str, tag) => {
            return str += tag.name + " "
        }, '')
        this.setState({
            updatingId: sessionToUpdate.id,
            category: sessionToUpdate.category,
            blurb: sessionToUpdate.blurb,
            tags: tags
        })
    }

    handleSubmit() {
        const tags = this.state.tags.split(' ')
        const updatedSession = {
            blurb: this.state.blurb,
            category: this.state.category,
            tags: tags,
            id: this.state.updatingId
        }
        this.props.updateSession(updatedSession)
    }

    render() {
      const myOpenSession = this.props.myOpenSession

      return (
        <div>
          {myOpenSession && myOpenSession.users &&
            <div>
            <h1>My Open Request</h1>
            <h2>{myOpenSession.category}</h2>
            <h3>{myOpenSession.users[0].username} writes: </h3>
            <p>{myOpenSession.blurb}</p>
            <div>
                {myOpenSession.tags.filter(tag => tag.name !== '').map(tag => (<span key={tag.id}>#{tag.name} </span>))}
            </div>
            <button onClick={() => this.props.deleteSession(myOpenSession)} >Delete</button>
            <button onClick={() => this.handleUpdate(myOpenSession)}>Update</button>
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

