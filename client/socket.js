import io from 'socket.io-client'


const socket = io(window.location.origin)


const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port:'3081'
})

export const peers = {}

const myVideo = document.createElement('video')
myVideo.muted = true

const constraints = {
    video: { facingMode: "user" },
    // Uncomment to enable audio
    audio: true,
  };

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(stream => {
    addvideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addvideoStream(video, userVideoStream)
        })
    })
    socket.on("user-connected", (userid) => {
        connectToNewUser(userid, stream)
    })
})

socket.on("user-disconnected", userid => {
        if(peers[userid]) {
            peers[userid].close()
        }
    })

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userid, stream){
    const call = myPeer.call(userid, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addvideoStream(userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })
    peers[userid] = call
}


function addvideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    if(videoGrid) {
    videoGrid.append(video)
    }
}

export default socket
