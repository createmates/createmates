
const initialVideo = {
    myVideo: {},
    partnersVideo: {}
}

const SET_MY_VIDEO = "SET_MY_VIDEO"
const SET_PARTNERS_VIDEO = 'SET_PARTNERS_VIDEO'

export const setMyVideo = (localStream) => {
    return {
        type: SET_MY_VIDEO,
        myVideo: localStream
    }
}

export const setPartnerVideo = (remoteStream) => {
    return {
        type: SET_PARTNERS_VIDEO,
        partnersVideo: remoteStream
    }
}


const videoReducer = (video = initialVideo, action) => {
    switch (action.type){
        case SET_MY_VIDEO:
            return {...video, myVideo: action.myVideo}
        case SET_PARTNERS_VIDEO:
            return {...video, partnersVideo: action.partnersVideo}
        default:
           return video
    }
}

export default videoReducer