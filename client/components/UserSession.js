import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const UserSession = (props) => {
  const session = props.session
    return (
      <div>
      {session.users && session.users[1]
       ?<div className="px-4 py-3">
          <h2 className="mb-0">{session.blurb}</h2>
          <div className="card d-flex justify-content" style={{width: "18rem"}}>
            <h3><Link to={`/${session.users[0].id}`}>{session.users[0].username}</Link></h3>
            <h3>Medium: {session.users[0].medium}</h3>
          </div>
          <div>
          <div className="card" style={{width: "18rem"}}>
            <h3><Link to={`/${session.users[1].id}`}>{session.users[1].username}</Link></h3>
            <h3>Medium: {session.users[1].medium}</h3>
          </div>
          </div>
        </div>
        : ''}

    </div>
    )
}

const mapState = (state) => {
  return {
    session: state.singleSession,
  };
};

export default connect(mapState)(UserSession)
