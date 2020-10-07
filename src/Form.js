import React from "react";

class Form extends React.Component {
  state = {
    prompt: "",
  };

  handleChange(event) {
    this.setState({ prompt: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(this.state));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="prompt"
          value={this.state.prompt}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Form;
