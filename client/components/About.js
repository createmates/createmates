import React from 'react';
import '../App.css';
import { Button } from './Button';
import './About.css';

function About() {
  return (
    <div className='hero-container'>
      <h1>Collaborate</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default About;
