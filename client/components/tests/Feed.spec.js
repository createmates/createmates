import React from 'react'
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';
import store from '../../store';
import Feed from '../Feed';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'


describe('Feed', () => {
    const fakeUser = {email: 'chad@email.com', id: 1, username: 'chad'}
    const testSession1 = {
        id: 1,
        category: 'Dance',
        users: [fakeUser],
        blurb: 'asdf asdf asdf',
        tags: ['hello', 'goodbye']
    }
    const testSession2 = {
        id: 2,
        category: 'Joke',
        users: [{id:2, username: "joker"}],
        blurb: 'lkjh lkjh lkjh'
    }
    describe('Feed with no open requests', () => {
        let mockAxios
        let wrapper;
        beforeEach(() => {
            sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
                return <div>{childern}</div>
            })
            mockAxios = new MockAdapter(axios)
            mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
            wrapper = mount(<Provider store={store}><rrd.MemoryRouter initialEntries={['/Feed']}><Feed /></rrd.MemoryRouter></Provider>)
        });
        afterEach(() => {
            mockAxios.restore()
            rrd.BrowserRouter.restore()
        })
         it('renders Other Artists Open Request in an h1', () => {
            expect(wrapper.find('h1').text()).to.be.equal("Other Artists' Open Requests")
        })
        it('renders a button to filter', () => [
            expect(wrapper.find('button').text()).to.be.equal("Filter")
        ])
        it('renders No open Requesets found when there are no request', () => {
            expect(wrapper.find('h2').text()).to.be.equal('No Open Requests Found')
        })
    })
    describe('Feed with open requests', () => {
        let mockAxios
        let wrapper;
        const testSessions = [testSession1, testSession2]
        beforeEach(() => {
            sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
                return <div>{childern}</div>
            })
            mockAxios = new MockAdapter(axios)
            mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
            mockAxios.onGet('/api/openSessions').replyOnce(200, testSessions)
            wrapper = mount(<Provider store={store}><rrd.MemoryRouter initialEntries={['/Feed']}><Feed /></rrd.MemoryRouter></Provider>)
        });
        afterEach(() => {
            mockAxios.restore()
            rrd.BrowserRouter.restore()
        })
        it('renders Other Artists Open Request in an h1', () => {
            expect(wrapper.find('h1').text()).to.be.equal("Other Artists' Open Requests")
        })
        it('renders a button to filter', () => [
            expect(wrapper.find('button').at(0).text()).to.be.equal("Filter")
        ])
        it('renders test session 1 category', () => {
            expect(wrapper.find('h2').at(0).text()).to.be.equal(testSession1.category)
        })
        it('renders test session 1 username writes', () => {
            expect(wrapper.find('h3').at(0).text()).to.be.equal(`${fakeUser.username} writes: `)
        })
        it('renders a button to match', () => [
            expect(wrapper.find('button').at(1).text()).to.be.equal("Match")
        ])
        it('renders tags in a span', () => {
            expect(wrapper.find('span').at(0).text()).to.include('#')
        })
        it('renders test session 2 category', () => {
            expect(wrapper.find('h2').at(1).text()).to.be.equal(testSession2.category)
        })
        it('renders test session 2 username writes', () => {
            expect(wrapper.find('h3').at(1).text()).to.be.equal(`${testSession2.users[0].username} writes: `)
        })
        it('renders a button to match', () => [
            expect(wrapper.find('button').at(2).text()).to.be.equal("Match")
        ])
        it('renders tags in a span', () => {
            expect(wrapper.find('span')).to.not.equal('# ')
        })
    })
})
