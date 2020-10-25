import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import sinon from 'sinon'
import * as rrd from 'react-router-dom'
import {expect} from 'chai'
import { mount } from 'enzyme'
import { Login } from '../AuthForm'
import { Provider } from 'react-redux'
import store from '../../store'
import SignUpForm from '../SignUpForm'



describe('Signup component', () => {
    let wrapper
    before(()=> {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
            return <div>{childern}</div>
        })
        wrapper = mount(<Provider store={store}><rrd.MemoryRouter initialEntries={['/signup']}><SignUpForm /></rrd.MemoryRouter></Provider>)
    })
    it('renders sign up at the top in a h3', () => {
        expect(wrapper.find('h3').text()).to.be.equal('Sign Up')
    })
    it('renders First Name', () => {
        expect(wrapper.find('label').at(0).text()).to.be.equal('First Name')
    })
    it('renders Last Name', () => {
        expect(wrapper.find('label').at(1).text()).to.be.equal('Last Name')
    })
    it('renders Email Address', () => {
        expect(wrapper.find('label').at(2).text()).to.be.equal('Email Address')
    })
    it('renders Password', () => {
        expect(wrapper.find('label').at(3).text()).to.be.equal('Password')
    })
    it('renders Already registered? Log in', () => {
        expect(wrapper.find('p').text()).to.be.equal('Already registered? Log in')
    })
    it('renders a Sign up button', () => {
        expect(wrapper.find('button').text()).to.be.equal('Sign Up')
    })

})