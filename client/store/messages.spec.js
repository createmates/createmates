/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'
// import messagesReducer, { gotNewMessage } from './messages'


// TODO: figure out how to mock sockets before uncommenting these tests.
//All tests should pass once it know what window on sockets is

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe.skip('Redux - messages', () => {
  let store
  let mockAxios

  let initialState = {sessions: [],
                            session: {}}
 const message = {content: 'hello'}
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })
  describe('Action creaters', () => {
    it('getNewMessage action creater', () => {
        expect(gotNewMessage(message)).to.deep.equal({
            type: 'GOT_NEW_MESSAGE',
            message
        })
    })
  })
  describe('Thunks', () => {
    it('getOpenSessionsThunk eventually dispatches the Get SESSIONS action', async () => {
      mockAxios.onGet('/api/openSessions').replyOnce(200, testSessions)
      await store.dispatch(getOpenSessionsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_OPEN_SESSIONS')
      expect(actions[0].sessions).to.be.deep.equal(testSessions)
    })
    it('addSessionThunk eventually dispatches the Get SESSION action', async () => {
        mockAxios.onPost('/api/openSessions', testSession1).replyOnce(200, testSession1)
        mockAxios.onGet('/api/openSessions').replyOnce(200, testSessions)
        await store.dispatch(addSessionThunk(testSession1))
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_SESSION')
        expect(actions[0].session).to.be.deep.equal(testSession1)
      })
  })
  describe.skip('openSession Reducer', () => {
    let testStore;
  
    beforeEach(()=>{
      initialState = []
        testStore = createStore(messagesReducer)
    })
    it('reduces on GET OPEN SESSIONS', () => {
      const action = { type: 'GET_OPEN_SESSIONS', sessions: testSessions };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(testSessions);
      expect(newState).to.not.be.equal(prevState);
    })
    it('reduces on GET OPEN SESSIONS', () => {
      const action = { type: 'GET_OPEN_SESSIONS', sessions: testSessions };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(testSessions);
      expect(newState).to.not.be.equal(prevState);
    })
    it('returns the initial state on default', () => {
        const action = { type: 'SET_session', testSession1 };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState).to.not.be.equal(testSession1);
    })
  })
})
