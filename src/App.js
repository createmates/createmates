import React, { useState } from "react";
// import { fetchWeather } from "./api/fetchWeather";
import Form from "./Form";
import "./App.css";

// class App extends React.Component{
//   // const [query, setQuery] = useState("");
//   // const [weather, setWeather] = useState({});

//   // const search = async (e) => {
//   //   if (e.key === "Enter") {
//   //     const data = await fetchWeather(query);
//   //     setWeather(data);
//   //     setQuery("");
//   //   }
//   // };
//   render(){  return (
//       <div className="main-container">
//         <header>What would you like to make today?</header>
//         <Form />
//       </div>
//     );
//   }
// };

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}


export default App;
