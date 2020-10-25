import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {Link, useHistory} from 'react-router-dom'
import MessagesList from './MessagesList';
import { getMatchedSessionThunk } from "../store";
import UserSession from './UserSession'
import UserSummary from './UserSummary'
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
     <div>
      <div className="mb-2" style={{width: '22rem'}}>
     {props.videos.finishSession
      ? <Summary history={history}/>
      : <button className="btn btn-info btn-md" onClick={() => getSummaryForm()}>Finish Session</button>}
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
          <SessionVideo />
          </div>
        </div>
        <UserSession />

        <MessagesList />

      </div>

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
