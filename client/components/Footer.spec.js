import * as rrd from 'react-router-dom';
import sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import Footer from './Footer';

describe('About component', () => {
    const fakeUser = {email: 'chad@email.com', id: 1, username: 'chad'}
    let mockAxios
    let wrapper

    before(() => {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
            return <div>{childern}</div>
        })
        mockAxios = new MockAdapter(axios)
        mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
        wrapper = shallow(<Footer />)
    })
    afterEach(() => {
        mockAxios.restore()
    })
    it('renders About Us in an h2', () => {
        expect(wrapper.find('h2').at(0).text()).to.be.equal('About Us')
    })
    xit('renders What are you waiting for? in an p', () => {
        expect(wrapper.find('Link').text()).to.be.equal('What are you waiting for?')
    })
})