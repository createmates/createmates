import React from 'react';
import '../App.css'
import About from '../components/About'
import Footer from './Footer';
import Cards from './Cards'

function Home() {
  return (
    <React.Fragment>
      <About />
      <Cards />
      <Footer />
    </React.Fragment>
  );
}

export default Home;
