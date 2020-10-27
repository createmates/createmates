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

      <video className="video-container" muted ref={userVideo} autoPlay>   </video>

     
      <video className="video-container2" ref={partnerVideo} autoPlay></video>
       
      
    </div>
  );

};

const mapState = (state) => {
  return {
    videos: state.videos,
  };
};




export default connect(mapState)(SessionVideo);
