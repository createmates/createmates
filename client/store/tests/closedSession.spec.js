/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'
import closedSessionsReducer, { getClosedSessionsThunk } from '../closedSessions'




const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Redux - Closed Sessions', () => {
  let store
  let mockAxios

  let initialState =  []
    const testSession1 = {
        id: 1,
        name: 'cody'
    }
    const testSessions = [testSession1, {id:2, name:'jane'}]
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })
  
  describe('Thunk', () => {
    it('getClosedSessionsThunk eventually dispatches the get closed sessions action', async () => {
        mockAxios.onGet('/api/closedSessions').replyOnce(200, testSessions)
        await store.dispatch(getClosedSessionsThunk())
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_CLOSED_SESSIONS')
        expect(actions[0].sessions).to.be.deep.equal(testSessions)
    })
  })
  describe('Closed Sessions Reducer', () => {
    let testStore;
    
    beforeEach(()=>{
        testStore = createStore(closedSessionsReducer)
    })
    it('reduces on GET CLOSED SESSIONS', () => {
      const action = { type: 'GET_CLOSED_SESSIONS', sessions: testSessions };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(testSessions);
      expect(newState).to.not.be.equal(prevState);
    })
    it('returns the initial state on default', () => {
        const action = { type: 'SET_PROFILE', testSession1 };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState).to.not.be.equal(testSession1);
    })
  })
})
