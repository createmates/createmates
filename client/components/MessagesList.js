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
            <ul className="message-list">
            {filteredMessages.map(message => (
                <Message message={message} key={message.id} />
            ))}
                <li>
                <NewMessageEntry sessionId={ sessionId }/>
                </li>

           </ul>

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
