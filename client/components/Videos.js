import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";


const SessionVideo = (props) => {

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
    //render two videos

    <div id="video-grid">
      <video className="d-flex align-items-end" muted ref={userVideo} autoPlay style={{ margin: "200px" }}></video>
      <video ref={partnerVideo} autoPlay style={{marginTop: '200px', marginLeft: '600px'}}></video>
    </div>
  );

};

const mapState = (state) => {
  return {
    videos: state.videos
  };
};




export default connect(mapState)(SessionVideo);
