import axios from 'axios'

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

const openSessionsReducer = (state = initialOpenSessions, action) => {
    switch (action.type) {
      case GET_OPEN_SESSIONS:
        return action.sessions
      default:
        return state
    }
  }
  
  
  export default openSessionsReducer
