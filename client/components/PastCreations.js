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

             <div className='cards__container'>
               <div className='cards__wrapper'>
                 <ul className='cards__items'>

                 {myClosedSessions.map(session =>
                 <CardItem className="carousel-cell"
                src={session.image}
                text={session.summary}
                label={session.category}
                users={session.users}
                tags={session.tags}
                date={convertDate(session.updatedAt)}
              />)}


                         </ul>
                    </div>
                </div>

    )
}

export default PastCreations;

