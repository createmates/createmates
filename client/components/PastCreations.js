import React from 'react';
import CardItem from './CardItem'

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
              <CardItem 
              src='https://kilkennynow.ie/wp-content/uploads/Rock-for-teac-1.jpeg'
              text={session.summary}
              label={session.category}
              users={session.users}
              tags={session.tags}
              date={session.updatedAt}
              />)}
          </ul>
        </div>
        </div>      
    )
}

export default PastCreations;