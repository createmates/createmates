import React from 'react'
import { expect } from 'chai';
import { mount} from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'

import Navbar from '../navbar';
        

describe('not logged in', () => {

        let navBar;
    beforeEach(() => {
        navBar = mount(<Provider store={store}><Navbar /></Provider>)
    })
    it('renders CreateMates', () => {
        expect(navBar.find('a').at(0).text()).to.be.equal('CREATEMATES')
    })
    it('renders CreateMates', () => {
        expect(navBar.find('a').at(1).text()).to.be.equal('Login/SignUp(current)')
    })
    it('only has two links', () => {
        expect(navBar.find('a')).to.have.lengthOf(2)
    })
    it('does not render Match with a mate', () => {
        expect(navBar.find('a', 3).text).to.not.equal('Match with a mate')
    })
})

