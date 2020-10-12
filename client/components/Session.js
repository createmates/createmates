import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getSingleSessionThunk } from "../store/singleSession";
import socket from "../socket";
import axios from "axios";

const myPeer = new Peer(undefined, {
  host: "/",
  port: "3081",
});

// making this async is for getting a roomid for testing multi - videos
// will be moving axios call if we still
// need it to the redux store.
// const getRoom = async () => {

//   const roomId = await axios.get("/api/rooms");
//   console.log(roomId);
// };
const Session = () => {
  // getRoom();
  const [stream, setStream] = useState();
  const [peers, setPeers] = useState({});


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
    socket.emit("join-room", this.state.session.roomId, id); //outgoing user id?
  });

  return (
    //render two videos
    <div id="video-grid">
      <video muted ref={userVideo} autoPlay style={{ margin: "200px" }}></video>
      <video ref={partnerVideo} autoPlay></video>
    </div>
  );
};

const mapState = (state) => {
  return {
    session: state.session,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSession: (sessionId) => {
      dispatch(getSingleSessionThunk(sessionId));
    },
  };
};

export default connect(mapState, mapDispatch)(Session);
