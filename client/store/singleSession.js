import axios from 'axios'
import history from '../history'


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
const getSession = session => ({type: GET_USER, user})


/**
 * THUNK CREATORS
 */

 export const getSingleSessionThunk = (sessionId) => {
  return async (dispatch) => {
  try {
    const singleSession = await axios.get(`/api/sessions/${sessionId}`);
    dispatch(getSession(singleSession.data));
   } catch (error) {
     console.error(error)
   }
  }
 }


/**
 * REDUCER
 */
export default function singleSessionReducer(state = defaultSession, action){
  switch (action.type) {
    case GET_SESSION:
      return action.session
    default:
      return state
  }
}
