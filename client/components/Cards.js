import React from 'react';
// import './Cards.css';
import CardItem from './CardItem';
import {connect} from 'react-redux';
import {getClosedSessionsThunk} from '../store/closedSessions'

class Cards extends React.Component {
  constructor() {
    super()
    this.whichSession = this.whichSession.bind(this)
  }

  componentDidMount() {
    this.props.getClosedSessions();

  }

  whichSession(index) {
    const sessions = this.props.closedSessions;
    return sessions[sessions.length - index]
  }

  convertDate(sessionDate) {
    let date = new Date(sessionDate)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  render() {
    const closedSessions = this.props.closedSessions
    

    return (
      closedSessions && closedSessions.length && closedSessions[closedSessions.length -1].users[0] ?
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
        <li data-target="#multi-item-example" data-slide-to="0" className="active"></li>
        <li data-target="#multi-item-example" data-slide-to="1"></li>
      </ol>


         {/*<h1 className="text-center">Check out what's been created so far!'</h1>*/}
         <div className="carousel-inner d-flex align-items-center">
          <div className="carousel-item active d-flex align-items-center">
             <CardItem className="d-block w-50" key={1}
              src={this.whichSession(1).image}
              text={this.whichSession(1).summary}
              label={this.whichSession(1).category}
              users={this.whichSession(1).users}
              tags={this.whichSession(1).tags}
              date={this.convertDate(this.whichSession(1).updatedAt)}
            />
            </div>
            <div className="carousel-item">
            <CardItem className="d-block w-50" key={2}
            src={this.whichSession(2).image}
              text={this.whichSession(2).summary}
              label={this.whichSession(2).category}
              users={this.whichSession(2).users}
              tags={this.whichSession(2).tags}
              date={this.convertDate(this.whichSession(2).updatedAt)}
            />
            </div>
            <div className="carousel-item">
            <CardItem className="d-block w-50" key={3}
              src={this.whichSession(3).image}
              text={this.whichSession(3).summary}
              label={this.whichSession(3).category}
              users={this.whichSession(3).users}
              tags={this.whichSession(3).tags}
              date={this.convertDate(this.whichSession(3).updatedAt)}
            />
            </div>
            <div className="carousel-item">
            <CardItem className="d-block w-50" key={4}
              src={this.whichSession(4).image}
              text={this.whichSession(4).summary}
              label={this.whichSession(4).category}
              users={this.whichSession(4).users}
              tags={this.whichSession(4).tags}
              date={this.convertDate(this.whichSession(4).updatedAt)}
            />
            </div>
            <div className="carousel-item">
            <CardItem className="d-block w-50" key={5}
              src={this.whichSession(5).image}
              text={this.whichSession(5).summary}
              label={this.whichSession(5).category}
              users={this.whichSession(5).users}
              tags={this.whichSession(5).tags}
              date={this.convertDate(this.whichSession(5).updatedAt)}
            />
          </div>
        </div>

        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
        </a>
    </div>: ''
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
