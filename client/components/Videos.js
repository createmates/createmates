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
 <div>
      <div className="d-flex flex-row bg-secondary">
      <video muted ref={userVideo} autoPlay></video>
      </div>
    <div>
        <div className="d-flex flex-row-reverse bg-secondary">
          <video ref={partnerVideo} autoPlay></video>
        </div>
      </div>
    </div>
  );

};

const mapState = (state) => {
  return {
    videos: state.videos,
    session: state.singleSession
  };
};




export default connect(mapState)(SessionVideo);
