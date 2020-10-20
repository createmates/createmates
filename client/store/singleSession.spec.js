// /* global describe beforeEach afterEach it */

// import {expect} from 'chai'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import {createStore} from 'redux'

// import singleSessionReducer, { getSession, getSingleSessionThunk, getMatchedSessionThunk } from './singleSession'


// // TODO: figure out how to mock sockets before uncommenting these tests.
// //All tests should pass once it know what window on sockets is

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('Redux - session', () => {
//   let store
//   let mockAxios

//   const initialState = {session: {}}
//     const session = {
//             id: 1,
//             name: 'cody'
//         }
//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })
//   it('getsession action creater', () => {
//       expect(getSession(session)).to.deep.equal({
//           type: 'GET_SESSION',
//           session
//       })
//   })
//   describe('getsessionThunk', () => {
//     it('eventually dispatches the Get SESSION action', async () => {
//       mockAxios.onGet('/api/openSessions/1').replyOnce(200, session)
//       await store.dispatch(getSingleSessionThunk(1))
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_SESSION')
//       expect(actions[0].session).to.be.deep.equal(session)
//     })
//     it('eventually dispatches the Get SESSION action', async () => {
//         mockAxios.onGet('/api/openSessions/1/matched').replyOnce(200, session)
//         await store.dispatch(getMatchedSessionThunk(1))
//         const actions = store.getActions()
//         expect(actions[0].type).to.be.equal('GET_SESSION')
//         expect(actions[0].session).to.be.deep.equal(session)
//       })
//   })
//   describe('singleSession Reducer', () => {
//     let testStore;
    
//     beforeEach(()=>{
//         testStore = createStore(singleSessionReducer)
//     })
//     it('reduces on GET session', () => {
//       const action = { type: 'GET_SESSION', session };

//       const prevState = testStore.getState();
//       testStore.dispatch(action);
//       const newState = testStore.getState();

//       expect(newState).to.be.deep.equal(session);
//       expect(newState).to.not.be.equal(prevState);
//     })
//     it('returns the initial state on default', () => {
//         const action = { type: 'SET_session', session };

//       const prevState = testStore.getState();
//       testStore.dispatch(action);
//       const newState = testStore.getState();

//       expect(newState).to.be.deep.equal(prevState);
//       expect(newState).to.not.be.equal(session);
//     })
//   })
// })
