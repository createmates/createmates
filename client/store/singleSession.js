import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_SESSION = 'GET_SESSION';


/**
 * INITIAL STATE
 */
const defaultSession = {}

/**
 * ACTION CREATORS
 */
const getSession = session => ({type: GET_SESSION, session})


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
      return action.session
    default:
      return state
  }
}


export default singleSessionReducer
