import axios from 'axios'
import socket from '../socket';
import {RESET_VIDEO} from './videos'

/**
 * ACTION TYPES
 */
const GET_SESSION = 'GET_SESSION';
const SESSION_SUMMARY = 'SESSION_SUMMARY'

/**
 * INITIAL STATE
 */
const defaultSession = {}

/**
 * ACTION CREATORS
 */
export const getSession = session => ({type: GET_SESSION, session})
export const sessionSummary = summary => ({type: SESSION_SUMMARY, summary})

/**
 * THUNK CREATORS
 */

 export const getSingleSessionThunk = (sessionId) => {
  return async (dispatch) => {
  try {
    const singleSession = await axios.get(`/api/openSessions/${sessionId}`);
    dispatch(getSession(singleSession.data));
   } catch (error) {
     console.error(error)
   }
  }
 }

 export const getMatchedSessionThunk = (userId) => {
  return async (dispatch) => {
    try {
      const singleSession = await axios.get(`/api/openSessions/${userId}/matched`);
      dispatch(getSession(singleSession.data));
      socket.emit('create or join', singleSession.data.roomId)
     } catch (error) {
       console.error(error)
     }
    }
 }

 export const getMyOpenSessionThunk = (userId) => {
   return async (dispatch) => {
     try {
       const myOpenSession = await axios.get(`/api/openSessions/${userId}/open`);
       dispatch(getSession(myOpenSession.data));
     } catch (error) {
       console.error(error)
     }
   }
 }




/**
 * REDUCER
 */
 const singleSessionReducer = (state = defaultSession, action) => {
  switch (action.type) {
    case GET_SESSION:
      return action.session;
    case SESSION_SUMMARY:
          return {...state, summary: action.summary}
    case RESET_VIDEO:
      return {...state, summary: ''}
    default:
      return state
  }
}


export default singleSessionReducer
