import React from 'react'
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';
import store from '../../store';

import Routes from '../../routes';
import Home from '../Home';
import { Login } from '../AuthForm';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'
import SignUpForm from '../SignUpForm';
import Summary from '../Summary';
import UserHome from '../UserHome';
import Session from '../Session';
import Feed from '../Feed';
import UserAccount from '../UserAccount';
import SignUpAccountInfo from '../SignUpAccountInfo';
import SignUpFeedGuide from '../SignUpFeedGuide';
import Navbar from '../navbar';


describe('NavBar/Routes', () => {
    describe('Routes', () => {
        const fakeUser = {email: 'chad@email.com', id: 1}
        const testSession = {
            id: 1,
            name: 'cody'
        }
        let mockAxios
        beforeEach(() => {
            sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
                return <div>{childern}</div>
            })
            mockAxios = new MockAdapter(axios)
            mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)

        });
        afterEach(() => {
            mockAxios.restore()
            rrd.BrowserRouter.restore()
        })
        
        it('renders <Login /> at path /login', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/login']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(Login)).to.have.length(1)
            expect(wapper.find(Home)).to.have.length(0)
        })
        it('renders <Home /> at path /home', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/home']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(Home)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <SignUpForm /> at path /signup', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/signup']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(SignUpForm)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <Summary /> at path /sessionSummary', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/sessionSummary']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(Summary)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <UserHome /> at path /create', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/create']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(UserHome)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <Session /> at path /session', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/session']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(Session)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <Feed /> at path /feed', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/feed']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(Feed)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <UserAccount /> at path /myAccount', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/myAccount']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(UserAccount)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <SignUpAccountInfo /> at path /startMyAccount', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/startMyAccount']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(SignUpAccountInfo)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <SignUPFeed /> at path /signUpFeedGuide', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/signUPFeedGuide']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(SignUpFeedGuide)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
        it('renders <UserAccount /> at path /:userId', () => {
            const wapper = mount(
                <Provider store={store}>
                    <rrd.MemoryRouter initialEntries={['/1']}>
                        <Routes />
                    </rrd.MemoryRouter>
                </Provider>
            )
            expect(wapper.find(UserAccount)).to.have.length(1)
            expect(wapper.find(Login)).to.have.length(0)
        })
    })
    describe('NavBar', () => {
        let navBar;
        beforeEach(() => {
            navBar = mount(<Provider store={store}><Navbar /></Provider>)
        })
        describe('not logged in', () => {
            xit('renders CreateMates', () => {
                expect(navBar.find('a').text()).to.be.equal('CREATEMATES')
            })
            it('does not render Match with a mate', () => {
                expect(navBar.find('a', 3).text).to.not.equal('Match with a mate')
            })
        })
        describe('logged in', () => {
            const fakeUser = {email: 'chad@email.com', id: 1}
            let mockAxios
            beforeEach(() => {
                mockAxios = new MockAdapter(axios)
                mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
            });
            afterEach(() => {
                mockAxios.restore()
            })
            xit('renders CreateMates', () => {
                expect(navBar.find('a', 0).text()).to.be.equal('CREATEMATES')
            })
            //These test are not written correct
            xit('renders Create', () => {
                expect(navBar.find('a', 1).text()).to.be.equal('Create')
            }) 
            xit('renders My Account', () => {
                expect(navBar.find('a', 2).text()).to.be.equal('My Account')
            }) 
            xit('renders Match with a mate', () => {
                expect(navBar.find('a', 3).text()).to.be.equal('Match with a mate')
            }) 
            xit('renders Logout', () => {
                expect(navBar.find({value: 'a', index: 4}).text()).to.be.equal('Logout')
            }) 
        })
    })
})