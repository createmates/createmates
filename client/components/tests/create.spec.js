import React from 'react'
import sinon from 'sinon'
import * as rrd from 'react-router-dom'
import {expect} from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../../store'
import UserHome from './UserHome'



describe('Signup component', () => {
    let wrapper
    before(()=> {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({childern}) => {
            return <div>{childern}</div>
        })
        wrapper = mount(<Provider store={store}><rrd.MemoryRouter initialEntries={['/create']}><UserHome /></rrd.MemoryRouter></Provider>)
    })
    it('render title', () => {
        expect(wrapper.find('h1').text()).to.be.equal('What do you want to create today?')
    })
    it('renders a link to See Other Artists', () => {
        expect(wrapper.find('a').text()).to.be.equal('See Other Artist\'s Requests')
    })
    describe('form', () => {
        it('renders category', () => {
            expect(wrapper.find('label').at(0).text()).to.be.equal('Choose Your Practice')
        })

        //these fields dont initial render
        //so i am not sure how to fake the state change
        xit('renders blurb field', () => {
            expect(wrapper.find('label').at(1).text()).to.be.equal('Write a couple of sentences about what you would like to create: ')
        })
        xit('renders Tags field', () => {
            expect(wrapper.find('label').at(2).text()).to.be.equal('Tags: ')
        })
   })

})