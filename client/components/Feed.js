import React from 'react'
import {connect} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import socket from '../socket'
import {deleteSessionThunk, getOpenSessionsThunk, updateSessionThunk} from '../store/openSessions'
import {categories} from './Form'
import OpenRequestCard from './OpenRequestCard'

class Feed extends React.Component {
    constructor() {
        super()
        this.state = {
            updatingId: false,
            category: '',
            blurb: '',
            tags: '',
            filter: false,
            filterCategory: 'Choose a Category',
            filterUser: '',
            filterTag: ''
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.filterForm = this.filterForm.bind(this)
        this.undoFilter = this.undoFilter.bind(this)
        this.handleMatch = this.handleMatch.bind(this)
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
        let value = event.target.value
        if(currentKey === 'filterTag' && value[0] === '#'){
            value = value.slice(1)
        }
        this.setState({
          [currentKey]: value
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

    filterForm(){
        this.setState({filter: true})
    }

    undoFilter(){
        this.setState({
            filter: false,
            filterCategory: 'Choose a Category',
            filterUser: '',
            filterTag: ''
        })
    }

    async handleMatch(session){
        let mySessions = this.props.openSessions.filter(session => this.props.user.id === session.users[0].id)
        if (!mySessions.length) {
            const roomId = uuidv4()
            const updatedSession = {
                roomId: roomId,
                id: session.id,
                user: this.props.user,
                status: 'matched'
            }

            await this.props.updateSession(updatedSession)
            this.props.history.push(`/session`)

            //starting the room in the socket connection
            socket.emit('create or join', roomId)
        } else {
            alert('YOU MUST DELETE YOUR OPEN REQUEST BEFORE MATCHING WITH ANOTHER USER\'S REQUEST');
        }
    }

    render() {
        let openSessions = this.props.openSessions
        let mySessions;
        if(openSessions && openSessions.length && openSessions[openSessions.length -1].users[0]){
            openSessions = openSessions.filter(session => this.props.user.id !== session.users[0].id)
             mySessions = this.props.openSessions.filter(session => this.props.user.id === session.users[0].id)
        }
        if(this.state.filterCategory !== 'Choose a Category'){
            openSessions = openSessions.filter(session => session.category === this.state.filterCategory)
        }
        if(this.state.filterUser !== ''){
            const userSessions = openSessions.filter(session => session.users[0].username.includes(this.state.filterUser))
            openSessions = userSessions
        }
        if(this.state.filterTag !== ''){
            const tagSessions = openSessions.filter(session => {
                const matchs = session.tags.filter(tag => tag.name.includes(this.state.filterTag))
                return matchs.length > 0})
            openSessions = tagSessions
        }
        return (
            <div>
                <div className="card">
                <h1>My Open Requests</h1>
                </div>


                {mySessions && mySessions.length
                ? mySessions.map(session => (
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

                <h1>Other Artists Open Requests</h1>

                {this.state.filter
                ? <form>
                    <button className="btn btn-info btn-lg" type="button" onClick={this.undoFilter}>Undo Filters</button>
                    <br />
                    <label htmlFor="filterCategory">Filter By Category</label>
                    <select name="filterCategory" onChange={this.handleChange}>
                        {categories.map(category => (
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                    <label htmlFor="filterUser">Search By User</label>
                    <input type="text" name="filterUser" onChange={this.handleChange} placeholder="Enter username"/>
                    <label htmlFor="filterTag">Filter By Tag</label>
                    <input type="text" name="filterTag" onChange={this.handleChange} placeholder="Enter a Tag"/>
                </form>
                : <button className="btn btn-info btn-lg" type="button" onClick={this.filterForm}>Filter</button>}
                <div>
                {openSessions && openSessions.length && openSessions[openSessions.length -1].users[0]
                    ? openSessions.map(session => <OpenRequestCard session={session} key={session.id} />)
                    : <h2>No Open Requests found</h2>
                }
                </div>



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
        deleteSession: (sessionToDelete) => dispatch(deleteSessionThunk(sessionToDelete)),
    }
}

export default connect(mapState, mapDispatch)(Feed)
