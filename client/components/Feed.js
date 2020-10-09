import React from 'react'
import {connect} from 'react-redux'


class Feed extends React.Component {
    render() {
        const allRequests = this.props.request
        return (
            <div>
                {allRequests && allRequests.length 
                ? allRequests.map(request => (
                    <div>
                        <h2>{request.user.username}</h2>
                        <p>{request.blub}</p>
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
        request: state.allRequest
    }
}

export default connect(mapState)(Feed)