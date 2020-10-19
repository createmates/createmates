import React from "react";
import Form from "./Form";

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
      <div className="jumbotron">
        <h1 className="display-4 text-dark">What do you want to create today?</h1>
        <Form history={this.props.history}/>

         <hr className="my-4"/>
         <a className="btn btn-info btn-lg" href="#" onClick={this.handleClick} role="button">See Other Artist's Requests</a>

       </div>

    );
  }
};
