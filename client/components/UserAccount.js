import React from 'react'
import {connect} from 'react-redux'
import {getProfileThunk} from '../store/profile'
import UpdateUserForm from './UpdateUserForm'
import ProfilePhoto from './ProfilePhoto'
import MyRequest from './MyRequest'

import PastCreations from './PastCreations'
import {getClosedSessionsThunk} from '../store/closedSessions'

import './UserAccount.css'




class UserAccount extends React.Component {

  componentDidMount() {
    if (this.props.match.params.userId) {
      const userId = this.props.match.params.userId
      this.props.getProfile(userId)
    } else {
      this.props.getProfile(this.props.user.id)
    }
    this.props.getSessions();
  }


  render() {
    const user = this.props.profile

    if(user.id){
      return (
        <div>

         <div className="row py-5 px-4">
            <div className="col-md-5 mx-auto">
              <div className="bg-white shadow rounded overflow-hidden">
                <div className="px-4 pt-0 pb-4 cover">
                  <div className="media align-items-end profile-head">
                    <div className="profile mr-3"><img src={user.photoPath ? user.photoPath : "https://assets.vogue.com/photos/5a906834966d3031b95ca0fe/master/pass/01-Austyn.jpg"} width="130" className="rounded mb-2 img-thumbnail"/>
                    {user.id === this.props.user.id &&  <ProfilePhoto />}
                    {user.id === this.props.user.id &&
                    <a className="btn btn-outline-dark btn-sm btn-block"><UpdateUserForm user={user}/></a>
                    }
                    </div>
                    <div className="media-body mb-5 text-white">
                      <h4 className="mt-0 mb-0">{user.firstName} {user.lastName}</h4>
                      <p className="small mb-4"><i className="fas fa-map-marker-alt mr-2"></i>@{user.username}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-light p-4 d-flex justify-content-end text-center">
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <small className="text-muted"> <i className="fas fa-image mr-1"></i>{user.email}</small>
                    </li>
                </ul>
            </div>
            <div className="px-4 py-3">
            <h5 className="mb-0">Artist Information</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0">Location: {user.city}, {user.state}</p>
                <p className="font-italic mb-0">Medium: {user.medium}</p>
                <p className="font-italic mb-0">Bio: {user.bio}</p>
            </div>
        </div>
            <div>
              <PastCreations user={user} sessions={this.props.sessions} />
              </div>
              </div>

              <div className="p-4 rounded shadow-sm bg-light">
                    <p>
                   <MyRequest />
                   </p>

                </div>
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
    profile: state.profile,
    sessions: state.closedSessions
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProfile: (userId) => {
      dispatch(getProfileThunk(userId))
    },
    getSessions: () => dispatch(getClosedSessionsThunk())
  }
}

export default connect(mapState, mapDispatch)(UserAccount);
