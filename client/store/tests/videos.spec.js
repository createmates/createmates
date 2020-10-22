import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import {createStore} from 'redux'
import videoReducer, { finishSession, resetVideo, setMyVideo, setPartnerVideo } from '../videos';


const mockStore = configureMockStore()

//for some yet known reason this is require sockets
describe('Redux - Video', () => {
    let store;
    const video = {id: 'hello'}
    const initialState = {
        myVideo: {},
        partnersVideo: {},
        finishSession: false
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
        it('finishSession', () => {
            expect(finishSession()).to.deep.equal({
                type: 'FINISH_SESSION'
            })
        })
        it('resetVideo', () => {
            expect(resetVideo()).to.deep.equal({
                type: 'RESET_VIDEO'
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
        it('reduces on FINISH_SESSION action', () => {
            const action = {
                type: 'FINISH_SESSION',
            }
            const prevState = testStore.getState();
            testStore.dispatch(action);
            const newState = testStore.getState();

            expect(newState.finishSession).to.be.equal(true)
            expect(newState.partnersVideo).to.be.deep.equal(prevState.partnersVideo)
            expect(newState.myVideo).to.be.deep.equal(prevState.myVideo)

        })
        it('resets videos to initial state on RESET_VIDEO action', () => {
            const action1 = {
                type: 'RESET_VIDEO',
            }
            const action2 = {
                type: 'SET_PARTNERS_VIDEO',
                partnersVideo: video 
            }
            const prevState = testStore.getState();
            testStore.dispatch(action2);
            testStore.dispatch(action1);
            const newState = testStore.getState();

            expect(newState.myVideo).to.be.deep.equal({})
            expect(newState.partnersVideo).to.be.deep.equal({})
            expect(newState.partnersVideo).to.not.be.equal(video)
            expect(newState.myVideo).to.be.deep.equal(prevState.myVideo)
            expect(newState.finishSession).to.be.equal(false)

        })
        it('returns the initial state on default', () => {
            const action = { type: 'SET_VIDEO', video };
    
          const prevState = testStore.getState();
          testStore.dispatch(action);
          const newState = testStore.getState();
    
          expect(newState).to.be.deep.equal(prevState);
          expect(newState).to.not.be.equal(video);
          expect(newState.partnersVideo).to.not.be.equal(video)
            expect(newState.myVideo).to.be.deep.equal(prevState.myVideo)
            expect(newState.finishSession).to.be.equal(false)
        })
    })
})