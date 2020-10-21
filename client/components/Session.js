import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import MessagesList from './MessagesList';
import { getMatchedSessionThunk } from "../store";
import UserSession from './UserSession'
import UserSummary from './UserSummary'


export let roomId;

const Session = (props) => {

  const [stream, setStream] = useState();

  const session = props.session
  const userVideo = useRef();
  const partnerVideo = useRef();

  roomId = session.roomId

  useEffect(() => {

    if(!session.users || session.status !== 'matched'){
        props.getSession(props.user.id)
    }

    setStream(props.videos.myVideo)
    if(userVideo.current && props.videos.myVideo.id){
      userVideo.current.srcObject = props.videos.myVideo
    }
    if(partnerVideo.current && props.videos.partnersVideo && props.videos.partnersVideo.id){
      partnerVideo.current.srcObject = props.videos.partnersVideo
    }
  })

    return (
    //render two videos

    <div>
      <UserSession />
        <div id="video-grid">
      <video muted ref={userVideo} autoPlay style={{ margin: "200px" }}></video>
      </div>
      <video ref={partnerVideo} autoPlay style={{marginTop: '200px', marginLeft: '600px'}}></video>

      <UserSummary />
    </div>
  );

};

const mapState = (state) => {
  return {
    session: state.singleSession,
    user: state.user,
    videos: state.videos
  };
};

const mapDispatch = dispatch => {
  return {
    getSession: (userId) => dispatch(getMatchedSessionThunk(userId))
  }
}


export default connect(mapState, mapDispatch)(Session);
