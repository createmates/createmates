import React from 'react'
import {connect} from 'react-redux'
import {getProfileThunk} from '../store/profile'
import UpdateUserForm from './UpdateUserForm'
import ProfilePhoto from './ProfilePhoto'



class UserAccount extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    if (this.props.match.params.userId) {
      const userId = this.props.match.params.userId
      this.props.getProfile(userId)
    } else {
      this.props.getProfile(this.props.user.id)
    }
  }





  render() {
    const user = this.props.profile
    
    if(user.id){
      return (
      <div>
        <div className="card">
          <div className="card-body">
            <h6 className="card-title text-center text-dark">Username: {user.username}</h6>
            <p className="card-text text-center text-dark">Medium: {user.medium}</p>
            <p className="card-text text-center text-dark">First Name: {user.firstName}</p>
            <p className="card-text text-center text-dark">Last Name: {user.lastName}</p>
            <p className="card-text text-center text-dark">Email: {user.email}</p>
            <p className="card-text text-center text-dark">City: {user.city}</p>
            <p className="card-text text-center text-dark">State: {user.state}</p>
            <p className="card-text text-center text-dark">Bio: {user.bio}</p>

            {user.id === this.props.user.id ?
            <UpdateUserForm user={user}/>
            : ''}
          </div>
        </div>
      </div>
      )
    } else {
      return <div>Loading</div>
    }
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
