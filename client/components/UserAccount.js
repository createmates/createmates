import React from 'react'
import {connect} from 'react-redux'
import {getProfileThunk} from '../store/profile'
import UpdateUserForm from './UpdateUserForm'


class UserAccount extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getProfile(userId)
  }

  render() {
    const user = this.props.profile
    return (
      <div id="single-user">
          {user.id &&
            <div>
            <h1>Username: {user.username}</h1>
            <h3>{user.firstName}</h3>
            <h3>{user.lastName}</h3>
            <h3>Email: {user.email}</h3>
            <h3>City: {user.city}</h3>
            <h3>State: {user.state}</h3>
            <h3>Bio: {user.bio}</h3>
            {user.id === this.props.user.id ? 
            <UpdateUserForm user={user}/> 
            : ''}
            </div>

          }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    profile: state.profile
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProfile: (userId) => {
      dispatch(getProfileThunk(userId))

    }
  }
}

export default connect(mapState, mapDispatch)(UserAccount);
