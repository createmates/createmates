import React from 'react';
import '../App.css';
import { Button } from './Button';
import './About.css';

function About() {
  return (
    <div className='hero-container'>
      <div className="button-and-text">
      <h2>CONNECT ••• COLLABORATE ••• CREATE</h2>
      </div>
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
