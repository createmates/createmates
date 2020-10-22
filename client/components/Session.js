import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {Link, useHistory} from 'react-router-dom'
import MessagesList from './MessagesList';
import { getMatchedSessionThunk } from "../store";
import Summary from "./Summary";
import socket from '../socket'
import {finishSession} from '../store/videos'
import SessionVideo from './Videos'


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

    <div id="video-grid">
      {session.users && session.users[1]
       ?<div>
          <h2>{session.blurb}</h2>
          <div className="card d-flex justify-content" style={{width: "18rem"}}>
            <h3><Link to={`/${session.users[0].id}`}>{session.users[0].username}</Link></h3>
            <h3>Medium: {session.users[0].medium}</h3>
          </div>
          <div>
          <div className="card d-flex justify-content" style={{width: "18rem"}}>
            <h3><Link to={`/${session.users[1].id}`}>{session.users[1].username}</Link></h3>
            <h3>Medium: {session.users[1].medium}</h3>
          </div>
          </div>
        </div>
        : ''}
        <div>
      </div>
      <SessionVideo />

      <MessagesList />
      {props.videos.finishSession 
      ? <Summary history={history}/>
      : <button className="btn btn-info btn-md" onClick={() => getSummaryForm()}>Finish Session</button>}
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
