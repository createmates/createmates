import React from 'react';
import CardItem from './CardItem'


const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}


function convertDate(sessionDate) {
    var date = new Date(sessionDate)
    var year = date.getFullYear()
    var month = months[date.getMonth()]
    var day = date.getDate();
    var creationDate = month + ' ' + day + ', ' + year;
    return creationDate;
  }

function PastCreations(props) {
    const user = props.user;
    const myClosedSessions =
        props.sessions.filter(session => {
            const userIds = session.users.map(user => user.id);
            return userIds.includes(user.id)
        })

    return (

        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
        <li data-target="#multi-item-example" data-slide-to="0" className="active"></li>
        <li data-target="#multi-item-example" data-slide-to="1"></li>
        </ol>

      <div className="carousel-inner d-flex align-items-center">
         <div className="carousel-item active d-flex align-items-center">

                {myClosedSessions.map(session =>
                 <CardItem className="d-block w-50"
                src={session.image}
                text={session.summary}
                label={session.category}
                users={session.users}
                tags={session.tags}
                date={convertDate(session.updatedAt)}
              />
              )}
            </div>
        </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default PastCreations;

