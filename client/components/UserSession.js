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
      <div id="container-vid">
      {/*<header className="text-center">
      SESSION PROMPT:
      <p className="text-center">{session.blurb}</p>
    </header>*/}




      {session.users && session.users[1]
       ?

       <div>

       <video className="video-container" muted ref={userVideo} autoPlay>   </video>

       {/*<img className="img-sm" src={session.users[1].photoPath} className="card-img"/>
       <Link to={`/${session.users[1].id}`}>{session.users[1].username}</Link>
      <p className='text-dark'>Medium: {session.users[1].medium}</p>*/}


      <Chat />


          <video className="video-container2" ref={partnerVideo} autoPlay></video>
          {/*<img src={session.users[0].photoPath} className="card-img"/>
          <Link to={`/${session.users[0].id}`}>{session.users[0].username}</Link>
      <p className="card-text text-dark">Medium: {session.users[0].medium}</p>*/}




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
