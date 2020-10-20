import axios from 'axios'
import {getSession} from './singleSession'

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

export const addSessionThunk = (newSession) => {
  return async (dispatch) => {
    try {
      const session = await axios.post('/api/openSessions', newSession)
      const sessions = await axios.get('/api/openSessions')
      dispatch(getSessions(sessions.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateSessionThunk = (updatedSession) => {
  return async (dispatch) => {
    try {
      const session = await axios.put(`/api/openSessions/${updatedSession.id}`, updatedSession)
      const sessions = await axios.get('/api/openSessions')
      dispatch(getSessions(sessions.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteSessionThunk = (sessionToDelete) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/openSessions/${sessionToDelete.id}`)
      const sessions = await axios.get('/api/openSessions')
      dispatch(getSessions(sessions.data))
      dispatch(getSession({}));
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
