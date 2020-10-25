import axios from 'axios'
import history from '../history'
import {getProfile} from './profile'
import {toast} from 'react-toastify'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}


const deniedEmailToast = () => {
  toast('We already have an account for that email address!', {
    className: "custom_toast",
    toastClassName: 'toast',
    closeOnClick: true,
    position: toast.POSITION.TOP_CENTER,
    autoClose: false,
  })
}

export const signup = signupInfo => async dispatch => {
  let response
  try {
    response = await axios.post('/auth/signup', signupInfo)
  } catch (authError) {
    deniedEmailToast();
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(response.data))
    history.push('/startMyAccount')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const getSingleUserThunk = (userId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    const singleUser = data
    dispatch(getUser(singleUser))
  } catch (err) {
    console.error(err)
  }
}


const deniedUsernameToast = () => {
  toast("Awesome username, but someone beat you to it!", {
    className: "custom_toast",
    toastClassName: 'toast',
    closeOnClick: true,
    position: toast.POSITION.TOP_CENTER,
    autoClose: false,
  })
}

export const updateUserThunk = (userFormData, userId) => {
  return async dispatch => {
    try {
      const userRes = await axios.put(`/api/users/${userId}`, userFormData)
      dispatch(getUser(userRes.data))
      dispatch(getProfile(userRes.data))
    } catch(err) {
      deniedUsernameToast();
      console.error(err)
    }
  }
}

export const savePhotoThunk = (selectedFile, userId) => {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('uploadImage', selectedFile)

      const userRes =  await axios.post(`/spaces/upload/${userId}`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
      dispatch(getUser(userRes.data))
      dispatch(getProfile(userRes.data))

    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
