import React from 'react'
import {connect} from 'react-redux'
import {deleteSessionThunk, getOpenSessionsThunk, updateSessionThunk} from '../store/openSessions'
import {categories} from './Form'

class Feed extends React.Component {
    constructor() {
        super()
        this.state = {
            updatingId: false,
            category: '',
            blurb: '',
            tags: ''
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getOpenSessions()
    }
    handleUpdate(sessionToUpdate){
        const tags = sessionToUpdate.tags.reduce((str, tag) => {
            return str += tag.name + " "
        }, '')
        this.setState({
            updatingId: sessionToUpdate.id,
            category: sessionToUpdate.category,
            blurb: sessionToUpdate.blurb,
            tags: tags
        })
    }

    handleChange = event => {
        const currentKey = event.target.name;
        this.setState({ 
          [currentKey]: event.target.value,
        });
      };
    
    handleSubmit() {
        const tags = this.state.tags.split(' ')
        const updatedSession = {
            blurb: this.state.blurb,
            category: this.state.category,
            tags: tags,
            id: this.state.updatingId
        }
        this.props.updateSession(updatedSession)
    }

    render() {
        const openSessions = this.props.openSessions
        return (
            <div>
                <h1>Other Artists Open Requests</h1>
                {openSessions && openSessions.length && openSessions[openSessions.length -1].users[0]
                ? openSessions.filter(session => this.props.user.id !== session.users[0].id).map(session => (
                    <div key={session.id}>
                        <h2>{session.category}</h2>
                        <h3>{session.users[0].username} writes: </h3>
                        <p>{session.blurb}</p>
                        <div>
                            {session.tags.filter(tag => tag.name !== '').map(tag => (<span key={tag.id}>#{tag.name} </span>))}
                        </div>
                        <button onClick={() => console.log('clicked Match')} >Match</button>
                    </div>
                ))
                : ''}
                <h1>My Open Requests</h1>
                {openSessions && openSessions.length && openSessions[openSessions.length -1].users[0]
                ? openSessions.filter(session => this.props.user.id === session.users[0].id)
                    .map(session => (
                    <div key={session.id}>
                        <h2>{session.category}</h2>
                        <h3>{session.users[0].username} writes: </h3>
                        <p>{session.blurb}</p>
                        <div>
                            {session.tags.filter(tag => tag.name !== '').map(tag => (<span key={tag.id}>#{tag.name} </span>))}
                        </div>
                        <button onClick={() => this.props.deleteSession(session)} >Delete</button>
                        <button onClick={() => this.handleUpdate(session)} >Update</button>
                        {this.state.updatingId === session.id
                        ? <form onSubmit={this.handleSubmit}>
                             <select name="category" onChange={this.handleChange} value={this.state.category}>
                            {categories.map(category => (
                                <option value={category} key={category}>{category}</option>
                            ))}
                            </select>
                            <div>
                                <label htmlFor="blurb">Write a couple of sentences about what you would like to create: </label>
                                <input 
                                type="textarea"
                                name="blurb"
                                value={this.state.blurb}
                                maxLength="75"
                                onChange={this.handleChange}
                                />
                                <label htmlFor="tags">Tags: </label>
                                <input
                                type="text"
                                name="tags"
                                value={this.state.tags}
                                onChange={this.handleChange}
                                />
                                <button type="submit">Go</button>
                            </div>
                        </form> 
                        : ''}
                    </div>
                ))
                : ''}
            </div>
        )
    }
}

const mapState = state => {
    return {
        openSessions: state.openSessions,
        user: state.user
    }
}

const mapDispatch = dispatch => {
    return {
        getOpenSessions: () => dispatch(getOpenSessionsThunk()),
        updateSession: (updatedSession) => dispatch(updateSessionThunk(updatedSession)),
        deleteSession: (sessionToDelete) => dispatch(deleteSessionThunk(sessionToDelete))
    }
}

export default connect(mapState, mapDispatch)(Feed)