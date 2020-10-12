import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Form from "./Form";

/**
 * COMPONENT
 */
export default class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault();
    this.props.history.push('/feed')
  }

  render() {
    return (
      <div>
        <h3>What do you want to create today?</h3>
        <Form history={this.props.history}/>
        <button onClick={this.handleClick} type="button">See Other Artist's Requests</button>
      </div>
    );
  }
};

// export default UserHome;
