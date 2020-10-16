import axios from 'axios'
import socket from '../socket'

// Action Types :-)
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE'


// Action Creators
const gotMessagesFromServer = messages => ({
    type: GOT_MESSAGES_FROM_SERVER,
    messages,
})
export const gotNewMessage = message => ({
    type: GOT_NEW_MESSAGE,
    message,
})

// Thunk Creator
export const fetchMessages = () => async dispatch => {
    const { data: messages } = await axios.get('/api/messages')
    dispatch(gotMessagesFromServer(messages))
}
export const sendMessage = message => async (dispatch, getState) => {
    message.user = getState().user
    const { data: newMessage } = await axios.post('/api/messages', message)
    dispatch(gotNewMessage(newMessage))
    socket.emit('new-message', newMessage)
}

// Reducer
const initialState = [];



const messagesReducer = (state = initialState, action) => {   
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER:
            return action.messages
        case GOT_NEW_MESSAGE:
            return [...state, action.message]
        default:
            return state
    }
}

export default messagesReducer;
