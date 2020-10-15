import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import socket from "../socket";
import {Link} from 'react-router-dom'

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



    return (
    //render two videos
    <div id="video-grid">
      {session.users[1]
       ?<div>
          <div>
            <h3><Link to={`/${session.users[0].id}`}>{session.users[0].username}</Link></h3>
            <h3>Medium: {session.users[0].medium}</h3>
          </div>
          <div>
            <h3><Link to={`/${session.users[1].id}`}>{session.users[1].username}</Link></h3>
            <h3>Medium: {session.users[1].medium}</h3>
          </div>
        </div> 
        : ''}
      
      <video muted ref={userVideo} autoPlay style={{ margin: "200px" }}></video>
      {/* <video ref={partnerVideo} autoPlay></video> */}
      <h2>{session.blurb}</h2>
      <Link to="/session/summary"><button>Finish Session</button></Link>
    </div>
  );
  
};

const mapState = (state) => {
  return {
    session: state.singleSession,
  };
};


export default connect(mapState)(Session);
