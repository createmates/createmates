import axios from 'axios'

const GET_OPEN_SESSIONS = 'GET_OPEN_SESSIONS';
const ADD_SESSION = 'ADD_SESSION'

const initialOpenSessions = [];

const getSessions = sessions => ({type: GET_OPEN_SESSIONS, sessions})

const addSession = session => ({type: ADD_SESSION, session})

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
      dispatch(addSession(session.data))
      history.push('/feed')
    } catch (error) {
      console.error(error)
    }
  }
}

const openSessionsReducer = (state = initialOpenSessions, action) => {
    switch (action.type) {
      case GET_OPEN_SESSIONS:
        return action.sessions
      case ADD_SESSION:
        return [...state, action.session]  
      default:
        return state
    }
  }
  
  
  export default openSessionsReducer
