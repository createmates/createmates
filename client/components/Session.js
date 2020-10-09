import React from 'react';
import { connect } from 'react-redux';
import { getSingleSessionThunk } from '../store/singleSession';
import { peers }  from '../socket.js';

class Session extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      //render two videos
      <div id='video-grid'></div>
    )
  }
}


const mapState = (state) => {
  return {
    session: state.session
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSession: (sessionId) => {
      dispatch(getSingleSessionThunk(sessionId))
    }
  }
}

export default connect(mapState, mapDispatch)(Session);
