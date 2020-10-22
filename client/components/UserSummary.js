import React from 'react'
import MessagesList from './MessagesList'
import {Link} from 'react-router-dom'


const UserSummary = () => {
  return (
    <div>
    <MessagesList />
    <Link to="/sessionSummary"><button className="btn btn-info btn-md">Finish Session</button></Link>
    </div>

  )
}

export default UserSummary;

