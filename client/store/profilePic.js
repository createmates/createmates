// import axios from 'axios'

// const ADD_PROFILE_PIC = 'ADD_PROFILE_PIC'

// const defaultProfilePic = {}

// export const addProfilePic = pic => ({type: ADD_PROFILE_PIC, pic})

// export const addProfilePicThunk = (pic) => async dispatch => {
//     try {
//       const {data} = await axios.post(`/api/digitalOcean/upload`, pic)
//       dispatch(addProfilePic(data))
//     } catch (err) {
//       console.error(err)
//     }
//   }

// export default function(state = defaultProfile, action) {
//     switch (action.type) {
//       case ADD_PROFILE_PIC:
//         return 
//       default:
//         return state
//     }
// }