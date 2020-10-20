import React from 'react'
import { Link } from 'react-router-dom'

const OpenRequestCard = props => {
    const session = props.session
    return (
        <div className="row">
            <div className="col d-flex justify-content-center">
                <div className="card w-75 text-center border-dark mb-3">
            <h2 className="card-body">{session.category}</h2>
            <h3><Link to={`/${session.users[0].id}`}>{session.users[0].username}</Link> writes: </h3>
            <p className="card-text text-dark">{session.blurb}</p>
            <div>
                {session.tags.filter(tag => tag.name !== '').map(tag => (<span key={tag.id}>#{tag.name} </span>))}
            </div>
            <button className="btn btn-info btn-lg" onClick={() => props.handleMatch(session)} >Match</button>
                </div>
            </div>
        </div>
    )
}

export default OpenRequestCard