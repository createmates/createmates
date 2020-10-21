import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import {createStore} from 'redux'
import videoReducer, { setMyVideo, setPartnerVideo } from '../videos';


const mockStore = configureMockStore()

//for some yet known reason this is require sockets
describe('video - redux', () => {
    let store;
    const video = {id: 'hello'}
    const initialState = {
        myVideo: {},
        partnersVideo: {}
    }

    beforeEach(() => {
        store = mockStore(initialState)
    })
    afterEach(()=> {
        store.clearActions()
    })
    describe('action creaters', () => {
        it('setMyVideo', () => {
            expect(setMyVideo(video)).to.deep.equal({
                type: 'SET_MY_VIDEO',
                myVideo: video
            })
        })
        it('setPartnerVideo', () => {
            expect(setPartnerVideo(video)).to.deep.equal({
                type: 'SET_PARTNERS_VIDEO',
                partnersVideo: video
            })
        })
    })
    describe('video reducer', () => {
        let testStore;
        beforeEach(()=> {
            testStore = createStore(videoReducer)
        })
        it('reduces on SET_MY_VIDEO action', () => {
            const action = {
                type: 'SET_MY_VIDEO',
                myVideo: video 
            }
            const prevState = testStore.getState();
            testStore.dispatch(action);
            const newState = testStore.getState();

            expect(newState.myVideo).to.be.deep.equal(video)
            expect(newState.myVideo).to.not.be.equal(prevState.myVideo)

        })
        it('reduces on SET_PARTNERS_VIDEO action', () => {
            const action = {
                type: 'SET_PARTNERS_VIDEO',
                partnersVideo: video 
            }
            const prevState = testStore.getState();
            testStore.dispatch(action);
            const newState = testStore.getState();

            expect(newState.partnersVideo).to.be.deep.equal(video)
            expect(newState.partnersVideo).to.not.be.equal(prevState.partnersVideo)

        })
        it('returns the initial state on default', () => {
            const action = { type: 'SET_VIDEO', video };
    
          const prevState = testStore.getState();
          testStore.dispatch(action);
          const newState = testStore.getState();
    
          expect(newState).to.be.deep.equal(prevState);
          expect(newState).to.not.be.equal(video);
        })
    })
})