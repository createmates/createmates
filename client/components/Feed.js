import React from 'react'
import {connect} from 'react-redux'
import {getOpenSessionsThunk} from '../store/openSessions'


class Feed extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getOpenSessions()
    }

    render() {
        const openSessions = this.props.openSessions
        return (
            <div>
                <h1>Open Requests Waiting For a Match</h1>
                {openSessions && openSessions.length 
                ? openSessions.map(session => (
                    <div key={session.id}>
                        <h2>{session.category}</h2>
                        <h3>{session.users[0].username} writes: </h3>
                        <p>{session.blurb}</p>
                        <div>
                            {session.tags.map(tag => (<span key={tag.id}>#{tag.name} </span>))}
                        </div>
                        <button onClick={() => console.log('clicked Match')} >Match</button>
                    </div>
                ))
                : ''}
            </div>
        )
    }
}

const mapState = state => {
    return {
        openSessions: state.openSessions
    }
}

const mapDispatch = dispatch => {
    return {
        getOpenSessions: () => dispatch(getOpenSessionsThunk())
    }
}

export default connect(mapState, mapDispatch)(Feed)