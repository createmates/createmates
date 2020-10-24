import React from 'react'
import {connect} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import socket from '../socket'
import {getOpenSessionsThunk, updateSessionThunk} from '../store/openSessions'
import {getSingleSessionThunk} from "../store/singleSession"
import {categories} from './Form'
import MyRequest from './MyRequest';
import OpenRequestCard from './OpenRequestCard'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import "../../client/App.css"
import user from '../store/user'
import { Redirect } from 'react-router-dom'

class Feed extends React.Component {
    constructor() {
        super()
        this.state = {
            filter: false,
            filterCategory: 'Categories',
            filterUser: '',
            filterTag: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.filterForm = this.filterForm.bind(this)
        this.undoFilter = this.undoFilter.bind(this)
        this.handleMatch = this.handleMatch.bind(this)
    }

    componentDidMount() {
        this.props.getOpenSessions()
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

    filterForm(){
        this.setState({filter: true})
    }

    undoFilter(){
        this.setState({
            filter: false,
            filterCategory: 'Categories',
            filterUser: '',
            filterTag: ''
        })
    }

  deniedToast = () => {
        toast('YOU MUST DELETE YOUR OPEN REQUEST BEFORE MATCHING WITH ANOTHER USER\'S REQUEST', {
          className: "custom_toast",
          toastClassName: 'toast',
          closeOnClick: true,
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
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
            const matchedMessage = {
                sessionId: session.id,
                requesterId: session.users[0].id,
                matcherName: this.props.user.username
            }
            socket.emit('matched', matchedMessage)

            //starting the room in the socket connection
            socket.emit('create or join', roomId)
        } else {
            this.deniedToast();
        }
    }

    render() {
        let openSessions = this.props.openSessions
        if(openSessions && openSessions.length && openSessions[openSessions.length -1].users[0]){
            openSessions = openSessions.filter(session => this.props.user.id !== session.users[0].id)
        }
        if(this.state.filterCategory !== 'Categories'){
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

                <MyRequest />

                <h1>Other Artists' Open Requests</h1>

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


                {openSessions && openSessions.length && openSessions[openSessions.length -1].users[0]
                    ? openSessions.map(session => <OpenRequestCard session={session} key={session.id} handleMatch={this.handleMatch}/>)
                    : <h2>No Open Requests found</h2>
                }
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
        getSession: (sessionId) =>  dispatch(getSingleSessionThunk(sessionId)),
        updateSession: (updatedSession) => dispatch(updateSessionThunk(updatedSession))
    }
}

export default connect(mapState, mapDispatch)(Feed)
