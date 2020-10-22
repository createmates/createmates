import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {signup} from '../store/user'

 class SignUpForm extends React.Component {
   constructor() {
     super()
     this.handleSubmit = this.handleSubmit.bind(this)
   }



 handleSubmit = (event) => {
   event.preventDefault()
   this.props.signUp(event)
 }
 render() {
   return (
     <form onSubmit={this.handleSubmit} className="text-center border border-light p-5">
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First Name</label>
          <input name="firstName" type="text" className="form-control" placeholder="First Name"/>
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input name="lastName" type="text" className="form-control" placeholder="Last Name"/>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input name="email" type="text" className="form-control" placeholder="Enter email"/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" className="form-control" placeholder="Enter password"/>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>


        <p className="forgot-password text-center">
          Already registered? <a href="/login">sign in</a>

        </p>
     </form>
   )
 }
}

const mapDispatch = (dispatch) => {
  return {
    signUp: (event) => {
      dispatch(signup({
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value
      }))
    }
  }
}

export default connect(null, mapDispatch)(SignUpForm)
