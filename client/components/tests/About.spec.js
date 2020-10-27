import * as rrd from 'react-router-dom';
import sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'
import { shallow } from 'enzyme';
import About from '../About';
import { expect } from 'chai';
import React from 'react';

describe.skip('About component', () => {
    const fakeUser = {email: 'chad@email.com', id: 1, username: 'chad'}
    let mockAxios
    let wrapper

    before(() => {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
            return <div>{childern}</div>
        })
        mockAxios = new MockAdapter(axios)
        mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
        wrapper = shallow(<About />)
    })
    afterEach(() => {
        mockAxios.restore()
    })
    it('renders collabrate in an h1', () => {
        expect(wrapper.find('h1').text()).to.be.equal('Collaborate')
    })
    it('renders What are you waiting for? in an p', () => {
        expect(wrapper.find('p').text()).to.be.equal('What are you waiting for?')
    })
})