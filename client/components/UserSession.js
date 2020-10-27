import React, {useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './UserSession.css'
import Chat from './Chat'


const UserSession = (props) => {
  const session = props.session
  const userVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {

    if(userVideo.current && props.videos.myVideo.id){
      userVideo.current.srcObject = props.videos.myVideo
    }
    if(partnerVideo.current && props.videos.partnersVideo && props.videos.partnersVideo.id){
      partnerVideo.current.srcObject = props.videos.partnersVideo
    }

  })
    return (
      <div >
      {session.users && session.users[1]
       ?

       <div id="container-vid">
       
       <div className="card border-dark mb-3" style={{width: '20rem'}}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={session.users[1].photoPath} className="card-img"/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title"><Link to={`/${session.users[1].id}`}>{session.users[1].username}</Link></h5>
                   <p className="card-text text-dark">Medium: {session.users[1].medium}</p>
                </div>
              </div>
            </div>
          </div>

     

          <div className="card border-dark mb-3" style={{width: '20rem'}}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={session.users[0].photoPath} className="card-img"/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title"><Link to={`/${session.users[0].id}`}>{session.users[0].username}</Link></h5>
                     <p className="card-text text-dark">Medium: {session.users[0].medium}</p>
                  </div>
                </div>
              </div>
            </div>



      </div>


        : ''}
        </div>


    )
}

const mapState = (state) => {
  return {
    videos: state.videos,
    session: state.singleSession,
  };
};

export default connect(mapState)(UserSession)
