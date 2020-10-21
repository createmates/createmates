import React from 'react'
import {connect} from 'react-redux'
import UpdateUserForm from './UpdateUserForm'


const SignUpAccountPage = (props) => {
    const user = props.user
    return (
        <div>
            <h1> Welcome {user.firstName} to createmates!</h1>
            <h2>Let others know what know more about you by filling out your user profile.</h2>
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
                </div>
            </div>
            <UpdateUserForm />
            <button type="button" disabled={!user.username || !user.medium} onClick={() => props.history.push('/signUpFeedGuide')}>Next</button>
        </div>
    )
}

const mapState = state => {
    return {
        user: state.user
    }
}

export default connect(mapState)(SignUpAccountPage)