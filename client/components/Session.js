import React from 'react';
import { connect } from 'react-redux';
import { getSingleSessionThunk } from '../store/singleSession';

class Session extends React.Component {
  constructor() {
    super();

  }

  onJoin {
  document.getElementById('video-display').appendChild(//joiner's video//
  )
  }

  render() {
    return (
      //render two videos
      <div id='video-display'>
        <video playsinline autoplay muted id='video-grid'></video>
      </div>
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
