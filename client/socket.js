import io from 'socket.io-client'
import store from './store'
import { gotNewMessage } from './store/messages'

const socket = io(window.location.origin)


socket.on('connect', () => {
    console.log('Connected!')
  })

socket.on('new-message', (message) => {
    store.dispatch(gotNewMessage(message))
  })


export default socket;
