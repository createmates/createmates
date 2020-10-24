import React from 'react'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/user'
import ProfilePhoto from './ProfilePhoto'

class SignUpAccountPage extends React.Component {
    constructor(){
        super()
        this.state = {
          username: '',
          medium: '',
          email: '',
          city: '',
          userState: '',
          bio: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

      componentDidMount() {
        this.setState({
          username: this.props.user.username,
          medium: this.props.user.medium,
          email: this.props.user.email,
          city: this.props.user.city,
          userState: this.props.user.state,
          bio: this.props.user.bio
        })
      }

      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      async handleSubmit(event) {
        event.preventDefault()
        const userId = this.props.user.id
        await this.props.updateUser(this.state, userId)
      }

      render() {
        const user = this.props.user
        return (
          <div>
            <h1> {user.firstName} {user.lastName}, welcome to CreateMates!</h1>
            <h2>Let others know what know more about you by filling out your user profile.</h2>

            <div>
        <ProfilePhoto />
        <form className="form-group" onSubmit={this.handleSubmit}>
          <div className="row py-5 px-4">
            <div className="col-md-5 mx-auto">
              <div className="bg-white shadow rounded overflow-hidden">
                <div className="px-4 pt-0 pb-4 cover">
                  <div className="media align-items-end profile-head">
                    <div className="profile mr-3"><img src="https://assets.vogue.com/photos/5a906834966d3031b95ca0fe/master/pass/01-Austyn.jpg" width="130" className="rounded mb-2 img-thumbnail"/>

                    </div>
                    <div className="media-body mb-5 text-white">
                      <h4 className="mt-0 mb-0">{user.firstName} {user.lastName}</h4>
                      <div className="form-group">
              <label htmlFor="username">Username <a style={{color: 'red'}}>*</a></label>
            <input name="username" type="text" onChange={this.handleChange} value={this.state.username} />
            </div>
                    </div>
                  </div>
                </div>
                <div className="bg-light p-4 d-flex justify-content-end text-center">
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" onChange={this.handleChange} value={this.state.email} />
                    </li>
                </ul>
            </div>
            <div className="px-4 py-3">
            <h5 className="mb-0">Artist Information</h5>
            <div className="p-4 rounded shadow-sm bg-light">

            <label htmlFor="city">City</label>
            <input name="city" type="text" onChange={this.handleChange} value={this.state.city} />

            <label htmlFor="state">State</label>
            <input name="userState" type="text" onChange={this.handleChange} value={this.state.userState} />

            <label htmlFor="medium">Medium <a style={{color: 'red'}}>*</a> </label>
            <input name="medium" type="text" onChange={this.handleChange} value={this.state.medium} />

            <label htmlFor="bio">Bio</label>
            <textarea name="bio" type="text" rows="4" cols="50" onChange={this.handleChange} value={this.state.bio}></textarea>

            <br></br>

            <button className="btn btn-info btn-sm" type="submit" role="button" disabled={!this.state.username || !this.state.medium}>Save Changes</button>

            <br></br>

            <button type="button" disabled={!this.props.user.username || !this.props.user.medium} onClick={() => this.props.history.push('/signUpFeedGuide')}>Next</button>

            </div>
        </div>

          </div>
      </div>
      </div>
      </form>
      </div>
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
     updateUser: (user, userId) => {
       dispatch(updateUserThunk(user, userId))
     }
   }
  }

export default connect(mapState, mapDispatch)(SignUpAccountPage)


