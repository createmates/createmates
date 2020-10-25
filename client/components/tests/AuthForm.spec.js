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



describe('login component', () => {
    let wrapper
    before(()=> {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
            return <div>{childern}</div>
        })
        wrapper = mount(<Provider store={store}><rrd.MemoryRouter initialEntries={['/login']}><Login /></rrd.MemoryRouter></Provider>)
    })
    it('renders sign in at the top in a p', () => {
        expect(wrapper.find('p').at(0).text()).to.be.equal('Sign in')
    })
    it('renders Not a member? Sign Up', () => {
        expect(wrapper.find('p').at(1).text()).to.be.equal('Not a member?   Sign Up   ')
    })

})