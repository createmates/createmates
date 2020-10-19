import React from 'react'
import Feed from './Feed'

const SignUpFeedGuide = props => {
    return (
        <div>
            <h1>Welcome to the feed page.</h1>
            <p>Here you will find all the open requests other users have made.</p>
            <p>You can filler the feed by catergory and tag, to find a request you wish to match with, Or you can click create above to open a request for other to match with you.</p>
            <p>You can only have one open request at a time. That open request will show on the side of you screen.</p>
            <p>To match with someone's request, simply have no open requests and click match under thier request.</p>
            <p>Click match will send you into a chat room to collabrate with the other user on a project.</p>
            <Feed />
        </div>
    )
}

export default SignUpFeedGuide