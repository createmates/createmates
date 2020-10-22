

const initialVideo = {
    myVideo: {},
    partnersVideo: {},
    finishSession: false,
}

const SET_MY_VIDEO = "SET_MY_VIDEO"
const SET_PARTNERS_VIDEO = 'SET_PARTNERS_VIDEO'
const FINISH_SESSION = 'FINISH_SESSION'
const RESET_VIDEO = 'RESET_VIDEO'

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

export const finishSession = () => {
    return {
        type: FINISH_SESSION
    }
}

export const resetVideo = () => {
    return {
        type: RESET_VIDEO
    }
}


const videoReducer = (video = initialVideo, action) => {
    switch (action.type){
        case SET_MY_VIDEO:
            return {...video, myVideo: action.myVideo}
        case SET_PARTNERS_VIDEO:
            return {...video, partnersVideo: action.partnersVideo}
        case FINISH_SESSION:
            return {...video, finishSession: true}
        case RESET_VIDEO:
            return initialVideo
        default:
           return video
    }
}

export default videoReducer