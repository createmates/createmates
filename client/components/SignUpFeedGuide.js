import React from 'react'
import Feed from './Feed'
import {connect} from 'react-redux'
import {getOpenSessionsThunk} from '../store/openSessions'
import {toast} from 'react-toastify'
import OpenRequestCard from './OpenRequestCard'
import {Redirect} from 'react-router-dom'

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
        toast("Please finish reading the instructions before matching with another user. Click next to continue!", {
          className: "custom_toast",
          toastClassName: 'toast',
          closeOnClick: true,
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        })
      }

    render(){
        let openSessions = this.props.openSessions;

        return (
            <div>
                {this.state.number === 0 && <h1 style={{color: 'white'}}>Welcome to the artist request feed!</h1>}
                {this.state.number === 1 && <h1 style={{color: 'white'}}>You can see what other artists want to create and filter by category, tag, or username.</h1>}
                {this.state.number === 2 && <h1 style={{color: 'white'}}>Match with an artist or click "Create" above to create your own request.</h1>}
                {this.state.number === 3 && <h1 style={{color: 'white'}}>Once matched, both artists can join a video collaboration room and begin creating!</h1>}
                {this.state.number === 4 && <h1 style={{color: 'white'}}>Click 'next' to start creating!</h1>}
                {this.state.number < 5 ?

                <div>
                    <button className="btn btn-info btn-lg" type='button' onClick={this.handleNext}>Next</button>
                    <div>

                    <h1 className="text-center">Other Artists' Open Requests</h1>

                    <button className="btn btn-info btn-lg" type="button" onClick={this.deniedToast}>Filter</button>


                    <div className="feed">
                    {openSessions && openSessions.length && openSessions[openSessions.length -1].users[0]
                        ? openSessions.map(session => <OpenRequestCard session={session} key={session.id} handleMatch={this.deniedToast}/>)
                        : <h2>No Open Requests found</h2>
                    }
                </div>
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
