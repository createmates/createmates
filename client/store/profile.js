import axios from 'axios'

const GET_PROFILE = 'GET_PROFILE'

const defaultProfile = {}

export const getProfile = profile => ({type: GET_PROFILE, profile})

export const getProfileThunk = (userId) => async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      const singleUser = data
      dispatch(getProfile(singleUser))
    } catch (err) {
      console.error(err)
    }
  }

export default function(state = defaultProfile, action) {
    switch (action.type) {
      case GET_PROFILE:
        return action.profile
      default:
        return state
    }
}