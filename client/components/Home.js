import React from 'react';
import '../App.css'
import About from '../components/About'
import Footer from './Footer';
import Cards from './Cards'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Home(props) {
  if(props.user.id && !props.user.username) {
    return <Redirect to="/startMyAccount" />
  } else {
    return (
      <React.Fragment>
        <About />
        <Cards />
        <Footer />
      </React.Fragment>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}
export default connect(mapState)(Home);
