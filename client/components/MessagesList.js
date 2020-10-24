import React from 'react'
import Message from './Message'
import NewMessageEntry from './NewMessageEntry'
import { connect } from 'react-redux'


export const MessagesList = props => {
    const sessionId = Number(props.session.id)
    const messages = props.messages
    if(messages.length) {
        const filteredMessages = messages.filter(
            message => message.sessionId === sessionId
        )

        return (
            <div>
                <div className="card mb-3 text-dark" style={{width: '26rem'}}>
                     <div className="col-md-4"></div>
                        <ul className="media-list">
                    {filteredMessages.map(message => (
                        <Message message={message} key={message.id} />
                    ))}
                        </ul>
                    </div>
                <div className="position-fixed">
                 <NewMessageEntry sessionId={ sessionId }/>
                </div>
            </div>
        )
    } else {
        return (
            <NewMessageEntry sessionId={ sessionId }/>
        )
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
    session: state.singleSession
})

export default connect(mapStateToProps)(MessagesList);
