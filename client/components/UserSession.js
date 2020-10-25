import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const UserSession = (props) => {
  const session = props.session
    return (
      <div>
      {session.users && session.users[1]
       ?<div>
          <div className="card mb-3" style={{width: '26rem'}}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={session.users[0].image} className="card-img"/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title"><Link to={`/${session.users[0].id}`}>{session.users[0].username}</Link></h5>
                   <p className="card-text text-dark">Medium: {session.users[0].medium}</p>
                </div>
              </div>
            </div>
          </div>
            <div className="card mb-3" style={{width: '26rem'}}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={session.users[1].image} className="card-img"/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title"><Link to={`/${session.users[1].id}`}>{session.users[1].username}</Link></h5>
                     <p className="card-text text-dark">Medium: {session.users[1].medium}</p>
                  </div>
                </div>
              </div>
            </div>
              <p>{session.blurb}</p>
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
