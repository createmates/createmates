import axios from 'axios'
import {getProfileThunk } from './profile';
import { getSession} from './singleSession'

const GET_OPEN_SESSIONS = 'GET_OPEN_SESSIONS';

const initialOpenSessions = [];

const getSessions = sessions => ({type: GET_OPEN_SESSIONS, sessions})

export const getOpenSessionsThunk = () => {
    return async (dispatch) => {
    try {
      const sessions = await axios.get('/api/openSessions');
      dispatch(getSessions(sessions.data));
     } catch (error) {
       console.error(error)
     }
    }
}

export const addSessionThunk = (newSession, history) => {
  return async (dispatch) => {
    try {
      const session = await axios.post('/api/openSessions', newSession)
      dispatch(getSession(session.data))
      dispatch(getOpenSessionsThunk())
      history.push('/feed')
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateSessionThunk = (updatedSession) => {
  return async (dispatch) => {
    try {
      const session = await axios.put(`/api/openSessions/${updatedSession.id}`, updatedSession)
      dispatch(getSession(session.data))
      dispatch(getOpenSessionsThunk())
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteSessionThunk = (sessionToDelete) => {
  return async (dispatch) => {
    try {
    
      const userId = sessionToDelete.users[0].id
     
      await axios.delete(`/api/openSessions/${sessionToDelete.id}`)
    
      dispatch(getSession({}));

      dispatch(getOpenSessionsThunk())

      dispatch(getProfileThunk(userId))

    } catch (error) {
      console.error(error)
    }
  }
}


const openSessionsReducer = (state = initialOpenSessions, action) => {
    switch (action.type) {
      case GET_OPEN_SESSIONS:
        return action.sessions
      default:
        return state
    }
  }


  export default openSessionsReducer
