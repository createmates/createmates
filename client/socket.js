import io from 'socket.io-client'
import store, { getSingleSessionThunk, sessionSummary } from './store'
import { gotNewMessage } from './store/messages'
import {roomId} from './components/Session'
import { finishSession, resetVideo, setMyVideo, setPartnerVideo } from './store/videos'
import {toast} from 'react-toastify'

if (process.env.NODE_ENV === "test") {
  global.window = {location: {origin : ''}}
}



const socket = io(window.location.origin)
let localStream;
let isCaller = false
let rtcPeerConnection

const iceServers = {
  'iceServers': [
      { 'urls': 'stun:stun.services.mozilla.com' },
      { 'urls': 'stun:stun.l.google.com:19302' }
  ]
}

const constraints = {
  video: { facingMode: "user" },
  // Uncomment to enable audio
  audio: true,
};

// handler functions for our WebRTC socket connections
async function onIceCandidate(event){
  if(event.candidate){
    socket.emit('candidate', {
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate,
      room: roomId
    })
  }
}

//adds the remote/other users video
function onAddStream(event){
  const remoteVideo = event.streams[0]
  store.dispatch(setPartnerVideo(remoteVideo))
}

const matchedToast = (matchedMessage) => {


  toast(`${matchedMessage.matcherName} has matched with your open request`, {
    className: "custom_toast",
    toastClassName: 'toast',
    closeOnClick: true,
    position: toast.POSITION.TOP_CENTER,
    autoClose: false,
  })
}
const newRequestToast = (newSession) => {


  toast(`${newSession.user.username} has opened a new ${newSession.category} request`, {
    className: "custom_toast",
    toastClassName: 'toast',
    closeOnClick: true,
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
  })
}

socket.on('connect', () => {
    console.log('Connected!')
  })
socket.on('newRequest', newSession => {
  newRequestToast(newSession)
})
socket.on('matched', matchedMessage => {
 const state = store.getState()
 if(state.user.id === matchedMessage.requesterId){
   matchedToast(matchedMessage)
   state.dispatch(getSingleSessionThunk(matchedMessage.sessionId))
 }
})
socket.on('new-message', (message) => { //messages for the chat box
    store.dispatch(gotNewMessage(message))
  })


socket.on('created', async function(room){ //will run for the first person in the room
  try{
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    localStream = stream
    isCaller = true
    store.dispatch(setMyVideo(localStream))
  } catch (error) {
    console.log('An error ocurred when accessing media devices', error);
  }
})

socket.on('joined', async function(room){ //will run for the second person in the room
  try{
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    localStream = stream
    socket.emit('ready', room)
    store.dispatch(setMyVideo(localStream))
  } catch (error) {
    console.log('An error ocurred when accessing media devices', error);
  }
})

socket.on('candidate', function(event) {
  const candidate = new RTCIceCandidate({
    sdpMLineIndex: event.label,
    candidate: event.candidate
  })
  rtcPeerConnection.addIceCandidate(candidate)
})

socket.on('ready', async function(){ //first person sending a offer to start the call/peer to peer connection
  if(isCaller){
    rtcPeerConnection = new RTCPeerConnection(iceServers)
    rtcPeerConnection.onicecandidate = onIceCandidate,
    rtcPeerConnection.ontrack = onAddStream;
    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream)
    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream)
    try{
      const sessionDescription = await rtcPeerConnection.createOffer()
      rtcPeerConnection.setLocalDescription(sessionDescription)
      socket.emit('offer', {
        type: 'offer',
        sdp: sessionDescription,
        room: roomId
      })
    } catch (error){
      console.error(error)
    }
  }
})

socket.on('offer', async function(event) { //accepting and answering the offer
  if(!isCaller){
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    //adds event listeners to the newly created object
    rtcPeerConnection.onicecandidate = onIceCandidate;
    rtcPeerConnection.ontrack = onAddStream;
    //adds current local stream to the object
    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream);
    //stores the offer as a remote description
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
    try{
      const sessionDescription = await rtcPeerConnection.createAnswer()
      rtcPeerConnection.setLocalDescription(sessionDescription)
      socket.emit('answer', {
        type: 'answer',
        sdp: sessionDescription,
        room: roomId
      })
    }catch (error){
      console.error(error);
    }
  }
})

socket.on('finishSession', function(event){
  store.dispatch(finishSession())
})
socket.on('summaryUpdate', function(summaryMessage){
  store.dispatch(sessionSummary(summaryMessage.content))
})
socket.on('closeSession', function(){
  console.log('redirect')
  store.dispatch(resetVideo())
  window.location = '/feed'
})
socket.on('answer', function(event) {
  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
})

export default socket;
