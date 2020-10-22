import React from 'react'
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';

import Navbar from '../navbar';
        
describe('not logged in', () => {
        let navBar;
    beforeEach(() => {
        navBar = mount(<Provider store={store}><Navbar /></Provider>)
    })
    it('renders CreateMates', () => {
        expect(navBar.find('a').text()).to.be.equal('CREATEMATES')
    })
    it('only has two links', () => {
        expect(navBar.find('a')).to.have.lengthOf(1)
    })
    it('does not render Match with a mate', () => {
        expect(navBar.find('a', 3).text).to.not.equal('Match with a mate')
    })
})
