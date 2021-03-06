import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleSessionReducer from './singleSession'
import openSessionsReducer from './openSessions'
import profile from './profile'
import messagesReducer from './messages'
import videoReducer from './videos'
import closedSessionsReducer from './closedSessions'

//exporting for Mocha Test usage
export const reducer = combineReducers({
    user: user,
    singleSession: singleSessionReducer,
    openSessions: openSessionsReducer,
    profile: profile,
    messages: messagesReducer,
    videos: videoReducer,
    closedSessions: closedSessionsReducer,
  })

  const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
  )
  const store = createStore(reducer, middleware)

  export default store
  export * from './user'
  export * from './singleSession'
  export * from './profile'
