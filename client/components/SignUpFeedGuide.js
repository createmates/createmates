import React from 'react'
import Feed from './Feed'
import {connect} from 'react-redux'
import {getOpenSessionsThunk} from '../store/openSessions'
import {toast} from 'react-toastify'
import OpenRequestCard from './OpenRequestCard'
import {Redirect} from 'react-router-dom'
import TutorialMessages from './TutorialMessages'

class SignUpFeedGuide extends React.Component {
    constructor(){
        super()
        this.state = {
            number: 0
        }
        this.handleNext = this.handleNext.bind(this)
        this.deniedToast = this.deniedToast.bind(this)
    }

    componentDidMount() {
        this.props.getOpenSessions()
    }

    handleNext(){
        const nextNumber = this.state.number + 1
        this.setState({number: nextNumber})
    }

    deniedToast = () => {
        toast("KEEP CLICKING 'NEXT'", {
          className: "custom_toast",
          toastClassName: 'toast',
          closeOnClick: true,
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        })
      }

    tutorialToast = () => {
        toast(<TutorialMessages />)
    }


    render(){
        let openSessions = this.props.openSessions;
        // return (
        //     <div>
        //     {toast(<TutorialMessages />, {
        //     className: "custom_toast",
        //     toastClassName: 'toast',
        //     closeOnClick: true,
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: false,
        //     })}
        //     <Feed />
        //     </div>
        //     )

        return (
            <div>
                <h1 style={{color: 'white'}}>HOW TO USE CREATEMATES:</h1>
                {this.state.number === 0 && <p style={{color: 'white'}}>Here you will find all the open requests other users have made.</p>}
                {this.state.number === 1 && <p style={{color: 'white'}}>You can filter the feed by category, tag, or username to find a request you wish to match with.</p>}
                {this.state.number === 2 && <p style={{color: 'white'}}>To match with someone's request, simply have no open requests and click match under their request.</p>}
                {this.state.number === 3 && <p style={{color: 'white'}}>Clicking match will send you into a chat room to collabrate with the other user on a project.</p>}
                {this.state.number === 4 && <p style={{color: 'white'}}>You can click create above to open a new request for others to match with you.</p>}
                {this.state.number === 5 && <p style={{color: 'white'}}>You can only have one open request at a time. That open request will show on the side of your screen.</p>}
                {this.state.number === 6 && <p style={{color: 'white'}}>Click 'next' to start creating!</p>}
                {this.state.number < 7 ?

                <div>
                    <button className="btn btn-info btn-lg" type='button' onClick={this.handleNext}>Next</button>
                    <div>

                    <h1 className="text-center">Other artists' open requests</h1>

                    <button className="btn btn-info btn-lg" type="button" onClick={this.deniedToast}>Filter</button>



                    {openSessions && openSessions.length && openSessions[openSessions.length -1].users[0]
                        ? openSessions.map(session => <OpenRequestCard session={session} key={session.id} handleMatch={this.deniedToast}/>)
                        : <h2>No Open Requests found</h2>
                    }
                </div>
            </div>

                : <Redirect to='/feed' />}


        )

            </div>
        )
    }
}

const mapState = state => {
    return {
        openSessions: state.openSessions,
    }
}

const mapDispatch = dispatch => {
    return {
        getOpenSessions: () => dispatch(getOpenSessionsThunk())
    }
}

export default connect(mapState, mapDispatch)(SignUpFeedGuide);
