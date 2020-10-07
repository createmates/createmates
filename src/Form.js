import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    prompt: "",
  };

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
        <input
          type="text"
          name="prompt"
          value={this.state.prompt}
          onChange={this.handleChange}
        />
        <button type="submit">I'm Ready</button>
      </form>
    );
  }
}

export default Form;
