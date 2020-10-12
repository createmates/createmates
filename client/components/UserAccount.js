import React from 'react'
import {connect} from 'react-redux'
import {getSingleUserThunk} from '../store/user'
import UpdateUserForm from './UpdateUserForm'


class UserAccount extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.gotSingleUser(userId)
  }



  render() {
    const user = this.props.user
    return (
      <div id="single-user">
          {user.id &&
            <div>
            <h1>Username: {user.username}</h1>
            <h3>Email: {user.email}</h3>
            <h3>City: {user.city}</h3>
            <h3>State: {user.state}</h3>
            <h3>Bio: {user.bio}</h3>
            <UpdateUserForm user={user}/>
            </div>

          }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    gotSingleUser: (userId) => {
      dispatch(getSingleUserThunk(userId))

    }
  }
}

export default connect(mapState, mapDispatch)(UserAccount);
