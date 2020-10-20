import React from 'react'
import Feed from './Feed'

class SignUpFeedGuide extends React.Component {
    constructor(){
        super()
        this.state = {
            number: 0
        }
        this.handleNext = this.handleNext.bind(this)
    }

    handleNext(){
        const nextNumber = this.state.number + 1
        this.setState({number: nextNumber})
    }
    render(){
        return (
            <div>
                <h1>Welcome to the Open Request Feed.</h1>
                {this.state.number === 0 && <p>Here you will find all the open requests other users have made.</p>}
                {this.state.number === 1 && <p>You can filler the feed by catergory and tag, to find a request you wish to match with</p>}
                {this.state.number === 2 && <p>To match with someone's request, simply have no open requests and click match under thier request.</p>}
                {this.state.number === 3 && <p>Click match will send you into a chat room to collabrate with the other user on a project.</p>}
                {this.state.number === 4 && <p>You can click create above to open a request for other to match with you.</p>}
                {this.state.number === 5 && <p>You can only have one open request at a time. That open request will show on the side of you screen.</p>}
                <button type='button' onClick={this.handleNext}>Next</button>
                <Feed />
            </div>
        )
    }
}

export default SignUpFeedGuide