/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'
import messagesReducer, { gotNewMessage,  fetchMessages, sendMessage} from '../messages'


// TODO: figure out how to mock sockets before uncommenting these tests.
//All tests should pass once it know what window on sockets is

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Redux - messages', () => {
  let store
  let mockAxios

  let initialState = []
 const message = {content: 'hello'}
 const messages = [message, {content: 'goodbye'}]
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
    it('fetchMessages eventually dispatches the GOT MESSAGES FROM SERVER action', async () => {
      mockAxios.onGet('/api/messages').replyOnce(200, messages)
      await store.dispatch(fetchMessages())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_MESSAGES_FROM_SERVER')
      expect(actions[0].messages).to.be.deep.equal(messages)
    })
    xit('sendMessage eventually dispatches the GOT NEW MESSAGE action', async () => {
        mockAxios.onPost('/api/messages').replyOnce(200, message)
        await store.dispatch(sendMessage(message))
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GOT_NEW_MESSAGE')
        expect(actions[0].message).to.be.deep.equal(message)
      })
  })
  describe('openSession Reducer', () => {
    let testStore;
  
    beforeEach(()=>{
      
        testStore = createStore(messagesReducer)
    })
    it('reduces on GOT_MESSAGES_FROM_SERVER', () => {
      const action = { type: 'GOT_MESSAGES_FROM_SERVER', messages };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(messages);
      expect(newState).to.not.be.equal(prevState);
    })
    it('reduces on GET OPEN SESSIONS', () => {
      const action = { type: 'GOT_NEW_MESSAGE', message };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal([message]);
      expect(newState).to.not.be.equal(prevState);
    })
    it('returns the initial state on default', () => {
        const action = { type: 'SET_session', messages};

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState).to.not.be.equal(messages);
    })
  })
})
