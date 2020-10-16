import React from "react";
import {connect} from 'react-redux';
import {addSessionThunk} from '../store/openSessions'
import profile, {getProfileThunk} from '../store/profile'

export const categories = ['Choose a Category', 'music', 'poem', 'dance', 'painting', 'drawing', 'joke', 'scene', 'script', 'theater improv', 'comedy']
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


  handleChange = event => {
    const currentKey = event.target.name;
    this.setState({
      [currentKey]: event.target.value,
      categoryChosen: true
    });
  };

  componentDidMount(){
   this.props.findUserProfile(this.props.user.id);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let unmatchedCount = 0
    for(let i = 0; i < this.props.profile.sessions.length; i++){
      if(this.props.profile.sessions[i].status === 'unmatched'){
        unmatchedCount++
        break
      }
    }
    if(unmatchedCount){
       alert('YOU MAY NOT OPEN MORE THAN ONE SESSION');
    } else {
      const tags = this.state.tags.split(' ')
      const newSession = {
        category: this.state.category,
        status: 'unmatched',
        blurb: this.state.blurb,
        user: this.props.user,
        tags: tags
      }
      this.props.addSession(newSession);
      this.props.history.push('/feed') 
    }
  }


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
    user: state.user,
    profile: state.profile
  }
}

const mapDispatch = dispatch => {
  return {
    addSession: (newSession) => dispatch(addSessionThunk(newSession)),
    findUserProfile: (userId) => dispatch(getProfileThunk(userId))
  }
}

export default connect(mapState, mapDispatch)(Form);
