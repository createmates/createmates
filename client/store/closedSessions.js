import axios from 'axios'


const GET_CLOSED_SESSIONS = 'GET_CLOSED_SESSIONS';

const initialClosedSessions = [];

const getClosedSessions = sessions => ({type: GET_CLOSED_SESSIONS, sessions})

export const getClosedSessionsThunk = () => {
    return async (dispatch) => {
    try {
      const sessions = await axios.get('/api/closedSessions');
      
      dispatch(getClosedSessions(sessions.data));
     } catch (error) {
       console.error(error)
     }
    }
}

export const uploadSessionPhoto = (selectedFile) => {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('uploadImage', selectedFile)
      
      await axios.post('/spaces/upload/Session', formData,  { headers: {'Content-Type': 'multipart/form-data'}})
    } catch (error){
      console.error(error)
    }
  }
}

// export const updateSessionThunk = (updatedSession) => {
//   return async (dispatch) => {
//     try {
//       const session = await axios.put(`/api/openSessions/${updatedSession.id}`, updatedSession)
//       dispatch(getSession(session.data))
//       dispatch(getOpenSessionsThunk())
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// export const deleteClosedSessionThunk = (sessionToDelete) => {
//   return async (dispatch) => {
//     try {
//       await axios.delete(`/api/closedSessions/${sessionToDelete.id}`)

//       dispatch(getSession({}));

//       dispatch(getOpenSessionsThunk())

//     } catch (error) {
//       console.error(error)
//     }
//   }
// }


const closedSessionsReducer = (state = initialClosedSessions, action) => {
    switch (action.type) {
      case GET_CLOSED_SESSIONS:
        return action.sessions
      default:
        return state
    }
  }


  export default closedSessionsReducer