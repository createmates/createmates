import React from "react";
import {connect} from 'react-redux'

const categories = ['music', 'poem', 'dance', 'painting', 'drawing', 'joke', 'scene', 'script', 'theater improv', 'comedy']
class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      prompt: "",
   };
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange = (event) => {
    this.setState({ prompt: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(this.state));
  };

  render() {
    const prompt = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <select name="category" onChange={() => {this.handleSubmit()}}>
          {categories.map(category => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </form>
    );
  }
}

// const mapState = state => {
//   return {

//   }
// }

export default Form;
