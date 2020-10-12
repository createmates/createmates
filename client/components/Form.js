import React from "react";
import {connect} from 'react-redux';
import {addSessionThunk} from '../store/openSessions'

const categories = ['Choose a Category', 'music', 'poem', 'dance', 'painting', 'drawing', 'joke', 'scene', 'script', 'theater improv', 'comedy']
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      categoryChosen: false,
      blurb: '',
      tags: '',
   };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleChange = (event) => {
    const currentKey = event.target.name;
    this.setState({ 
      [currentKey]: event.target.value,
      categoryChosen: true 
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const tags = this.state.tags.split(' ')
    const newSession = {
      category: this.state.category,
      status: 'unmatched',
      blurb: this.state.blurb,
      user: this.props.user,
      tags: tags
    }
    this.props.addSession(newSession, this.props.history);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select name="category" onChange={this.handleChange}>
          {categories.map(category => (
            <option value={category} key={category}>{category}</option>
          ))}
        </select>
        {this.state.categoryChosen ? (
          <div>
            <label htmlFor="blurb">Write a couple of sentences about what you would like to create: </label>
            <input 
            type="textarea"
            name="blurb"
            placeholder="Tell us more..."
            maxLength="75"
            onChange={this.handleChange}
            />
            <label htmlFor="tags">Tags: </label>
            <input
            type="text"
            name="tags"
            placeholder="Separate each tag with a space..."
            onChange={this.handleChange}
            />
            <button type="submit">Go</button>
          </div>

        ) : ''
        }
      </form>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addSession: (newSession, history) => dispatch(addSessionThunk(newSession, history))
  }
}

export default connect(mapState, mapDispatch)(Form);
