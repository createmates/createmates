import * as rrd from 'react-router-dom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import Footer from './Footer';

describe('About component', () => {
    const fakeUser = {email: 'chad@email.com', id: 1, username: 'chad'}
   
    let wrapper

    before(() => {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
            return <div>{childern}</div>
        })
        wrapper = shallow(<Footer />)
    })
    
    it('renders About Us in an h2', () => {
        expect(wrapper.find('h2').at(0).text()).to.be.equal('About Us')
    })
    it('renders How it works link', () => {
        expect(wrapper.find('Link').at(0).text()).to.be.equal('How it works')
    })
    it('renders  testimonials link', () => {
        expect(wrapper.find('Link').at(1).text()).to.be.equal('Testimonials')
    })
    it('renders Terms of Service link', () => {
        expect(wrapper.find('Link').at(2).text()).to.be.equal('Terms of Service')
    })
    it('renders Contact Us in an h2', () => {
        expect(wrapper.find('h2').at(1).text()).to.be.equal('Contact Us')
    })
    it('renders contact link', () => {
        expect(wrapper.find('Link').at(3).text()).to.be.equal('Contact')
    })
    it('renders  support link', () => {
        expect(wrapper.find('Link').at(4).text()).to.be.equal('Support')
    })
    it('renders CreateMates link', () => {
        expect(wrapper.find('Link').at(5).text()).to.be.equal('CreateMates')
    })
    it('renders copywrite ', () => {
        expect(wrapper.find('small').text()).to.be.equal('CM © 2020')
    })
})