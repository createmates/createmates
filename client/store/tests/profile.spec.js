/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import reducer, { getProfile, getProfileThunk } from '../profile'
import {createStore} from 'redux'




const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Redux - Profile', () => {
  let store
  let mockAxios

  const initialState = {profile: {}}
    const profile = {
            id: 1,
            name: 'cody'
        }
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })
  it('getProfile action creater', () => {
      expect(getProfile(profile)).to.deep.equal({
          type: 'GET_PROFILE',
          profile
      })
  })
  describe('getProfileThunk', () => {
    it('eventually dispatches the GetProfile action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/api/users/1').replyOnce(200, fakeUser)
      await store.dispatch(getProfileThunk(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PROFILE')
      expect(actions[0].profile).to.be.deep.equal(fakeUser)
    })
  })
  describe('singleSession Reducer', () => {
    let testStore;
    
    beforeEach(()=>{
        testStore = createStore(reducer)
    })
    it('reduces on GET PROFILE', () => {
      const action = { type: 'GET_PROFILE', profile };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(profile);
      expect(newState).to.not.be.equal(prevState);
    })
    it('returns the initial state on default', () => {
        const action = { type: 'SET_PROFILE', profile };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState).to.not.be.equal(profile);
    })
  })
})
