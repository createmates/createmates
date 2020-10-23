import React from 'react'
import {updateUserThunk} from '../store/user'
import {connect} from 'react-redux'

class UpdateUserForm extends React.Component {
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
    return (
      <div>
      <a className="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Edit Profile</a>
        <form className="collapse" id="collapseExample" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
      <input name="username" type="text" onChange={this.handleChange} value={this.state.username} />
        </div>
        <div className="form-group">
          <label htmlFor="medium">Medium</label>
      <input name="medium" type="text" onChange={this.handleChange} value={this.state.medium} />
        </div>
        <div className="form-group">
      <label htmlFor="email">Email</label>
      <input name="email" type="text" onChange={this.handleChange} value={this.state.email} />
          </div>
            <div className="form-group">
      <label htmlFor="city">City</label>
      <input name="city" type="text" onChange={this.handleChange} value={this.state.city} />
            </div>
             <div className="form-group">
      <label htmlFor="state">State</label>
      <input name="userState" type="text" onChange={this.handleChange} value={this.state.userState} />
      </div>

      <label htmlFor="bio">Bio</label>
      <textarea name="bio" type="text" rows="4" cols="50" onChange={this.handleChange} value={this.state.bio}></textarea>
      <br></br>
      <button className="btn btn-info btn-sm" type="submit" data-toggle="collapse" data-target="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Save Changes</button>
      </form>

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

export default connect(mapState, mapDispatch)(UpdateUserForm)
