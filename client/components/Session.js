import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import socket from "../socket";
import {Link} from 'react-router-dom'
import MessagesList from './MessagesList';
import { getMatchedSessionThunk } from "../store";

const myPeer = new Peer(undefined, {
  host: "/",
  port: "3081",
});


const Session = (props) => {

  let completed = false;



  const [stream, setStream] = useState();
  const [peers, setPeers] = useState({});

  const session = props.session
  const userVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    const constraints = {
      video: { facingMode: "user" },
      // Uncomment to enable audio
      audio: true,
    };
console.log(props.user)
    props.getSession(props.user.id)

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      myPeer.on("call", (call) => {
        call.answer(stream);
        call.on("stream", (userVideoStream) => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = userVideoStream;
          }
        });
      });
      socket.on("user-connected", (userid) => {
        console.log("userId", userid);
        const call = myPeer.call(userid, stream);
        call.on("stream", (userVideoStream) => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = userVideoStream;
          }
        });
        call.on("close", () => {
          video.remove();
        });
        setPeers({ userId: call });
      });
    });
  }, []);

  socket.on("user-disconnected", (userid) => {
    if (peers[userid]) {
      peers[userid].close();
    }
  });

  myPeer.on("open", (id) => {
    console.log(session.roomId)
    socket.emit("join-room", session.roomId, id); //outgoing user id?
  });


// console.log(session)
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
          <div className="card" style={{width: "18rem"}}>
            <h3><Link to={`/${session.users[1].id}`}>{session.users[1].username}</Link></h3>
            <h3>Medium: {session.users[1].medium}</h3>
          </div>
          </div>
        </div>
        : ''}
        <div>
      <video className="d-flex align-items-end" muted ref={userVideo} autoPlay style={{ margin: "200px" }}></video>
      </div>
      {/* <video ref={partnerVideo} autoPlay></video> */}

      <MessagesList />
      <Link to="/sessionSummary"><button className="btn btn-info btn-md">Finish Session</button></Link>
    </div>
  );

};

const mapState = (state) => {
  return {
    session: state.singleSession,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getSession: (userId) => dispatch(getMatchedSessionThunk(userId))
  }
}


export default connect(mapState, mapDispatch)(Session);
