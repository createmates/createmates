import React from 'react'
import { Link } from 'react-router-dom'

const OpenRequestCard = props => {
    const session = props.session
    return (



            <div className="col-sm-6">

                 <div className="card testimonial-card">
                    <div className="card-up teal lighten-2">
                    </div>
                      <div className="avatar mx-auto white">
                        <img src={session.users[0].photoPath} className="rounded-circle img-fluid"/>
                        </div>
                    <div className="card-body">
                    <h2 className="text-center text-dark">{session.category}</h2>
                    <h3 className=" text-center text-dark"><Link to={`/${session.users[0].id}`}>{session.users[0].username}</Link> writes: </h3>

                    <p className="card-text text-center text-dark"><i ></i>{session.blurb}</p>
                    </div>
                    <div className="card-footer">
                    {session.tags && session.tags.filter(tag => tag.name !== '').map(tag => (<span key={tag.id}>#{tag.name} </span>))}
                    </div>

                    <button className="btn btn-info btn-lg" onClick={() => props.handleMatch(session)} >Match</button>

                </div>



        </div>




    )
}

export default OpenRequestCard
