/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout, getSingleUserThunk, updateUserThunk} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe.only('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })

  describe('getSingleUserThunk', () => {
    it('eventually dispatches the GetUser action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/api/users/1').replyOnce(200, fakeUser)
      await store.dispatch(getSingleUserThunk(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  })

  describe('updateUserThunk', () => {
    it('eventually dispatches the GetUser action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onPut('/api/users/1', fakeUser).replyOnce(200, fakeUser)
      await store.dispatch(updateUserThunk(fakeUser, 1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
    it('eventually dispatches the GetProfile action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onPut('/api/users/1', fakeUser).replyOnce(200, fakeUser)
      await store.dispatch(updateUserThunk(fakeUser, 1))
      const actions = store.getActions()
      expect(actions[1].type).to.be.equal('GET_PROFILE')
      expect(actions[1].profile).to.be.deep.equal(fakeUser)
    })
  })
})
