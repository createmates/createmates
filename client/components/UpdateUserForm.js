import React from 'react'
import {updateUserThunk} from '../store/user'
import {connect} from 'react-redux'

class UpdateUserForm extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      email: '',
      city: '',
      state: '',
      bio: ''

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      username: this.props.user.username,
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
      <h3>Edit Profile</h3>
      <form id="user-form" onSubmit={this.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input name="username" type="text" onChange={this.handleChange} value={this.username} />

      <label htmlFor="email">Email</label>
      <input name="email" type="text" onChange={this.handleChange} value={this.email} />

      <label htmlFor="city">City</label>
      <input name="city" type="text" onChange={this.handleChange} value={this.city} />

      <label htmlFor="state">State</label>
      <input name="state" type="text" onChange={this.handleChange} value={this.userState} />

      <label htmlFor="bio">Bio</label>
      <input name="bio" type="text" onChange={this.handleChange} value={this.bio} />
      <button type="submit">Save Changes</button>
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
