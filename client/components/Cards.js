import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {connect} from 'react-redux';
import closedSessionsReducer, {getClosedSessionsThunk} from '../store/closedSessions'

class Cards extends React.Component {

  componentDidMount() {
    this.props.getClosedSessions();
  }

  whichSession(index) {
    const sessions = this.props.closedSessions;
    return sessions[sessions.length - index]
  }

  render() {
    const closedSessions = this.props.closedSessions;
    return (
      closedSessions && closedSessions.length && closedSessions[closedSessions.length -1].users[0] ? 
    <div className='cards'>
      <h1>Check Out What's Been Created So Far!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://cms.qz.com/wp-content/uploads/2019/12/The-power-of-dance-e1575906582595.jpg?quality=75&strip=all&w=1600&h=900&crop=1'
              text={this.whichSession(1).summary}
              label={this.whichSession(1).category}
              sessionUsers={this.whichSession(1).users}
              tags={this.whichSession(1).tags}
            />
            <CardItem
              src='https://kilkennynow.ie/wp-content/uploads/Rock-for-teac-1.jpeg'
              text={this.whichSession(2).summary}
              label={this.whichSession(2).category}
              users={this.whichSession(2).users}
              tags={this.whichSession(2).tags}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://images.unsplash.com/photo-1473186505569-9c61870c11f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
              text={this.whichSession(3).summary}
              label={this.whichSession(3).category}
              users={this.whichSession(3).users}
              tags={this.whichSession(3).tags}
            />
            <CardItem
              src='https://www.outdoorpainter.com/wp-content/uploads/2020/07/how-to-paint-landscapes-Christine-Lashley-072720a.jpg'
              text={this.whichSession(4).summary}
              label={this.whichSession(4).category}
              users={this.whichSession(4).users}
              tags={this.whichSession(4).tags}
            />
            <CardItem
              src='https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/40115/article_full%401x.jpg'
              text={this.whichSession(5).summary}
              label={this.whichSession(5).category}
              users={this.whichSession(5).users}
              tags={this.whichSession(5).tags}
            />
          </ul>
        </div>
      </div>
    </div> : ''
    )};
}

const mapState = state => {
  return {
    closedSessions: state.closedSessions
  }  
}

const mapDispatch = dispatch => {
  return {
    getClosedSessions: () => dispatch(getClosedSessionsThunk())
  }
}

export default connect(mapState, mapDispatch)(Cards)
