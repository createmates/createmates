import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory} from 'react-router-dom'
// import MessagesList from './MessagesList';
import { getMatchedSessionThunk } from "../store";
import UserSession from './UserSession'
import Summary from "./Summary";
import socket from '../socket'
import {finishSession} from '../store/videos'
import SessionVideo from './Videos'
import Chat from './Chat'
import './Session.css'



export let roomId;

const Session = (props) => {

  const session = props.session
  const history = useHistory()
  roomId = session.roomId

  useEffect(() => {
    if(!session.users || session.status !== 'matched'){
        props.getSession(props.user.id)
    }
  })

  const getSummaryForm = () => {
    socket.emit('finishSession', roomId);
    props.finishSession()
  }

    return (
    //render two videos
     <div>



     {props.videos.finishSession
      ? <Summary history={history}/>
      : <button className="btn btn-info btn-md" onClick={() => getSummaryForm()}>Finish Session</button>}




     <Chat />


     <UserSession />






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
    getSession: (userId) => dispatch(getMatchedSessionThunk(userId)),
    finishSession: ()=> dispatch(finishSession())
  }
}


export default connect(mapState, mapDispatch)(Session);
