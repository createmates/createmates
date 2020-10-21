import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check Out What's Been Created So Far!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://cms.qz.com/wp-content/uploads/2019/12/The-power-of-dance-e1575906582595.jpg?quality=75&strip=all&w=1600&h=900&crop=1'
              text='Workshopped a new sequence'
              label='Dance'
            />
            <CardItem
              src='https://kilkennynow.ie/wp-content/uploads/Rock-for-teac-1.jpeg'
              text='Finally finished that hook!'
              label='Music'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://images.unsplash.com/photo-1473186505569-9c61870c11f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
              text='So nice to get back into the swing of things'
              label='Poetry'
            />
            <CardItem
              src='https://www.outdoorpainter.com/wp-content/uploads/2020/07/how-to-paint-landscapes-Christine-Lashley-072720a.jpg'
              text='One step closer to my opus'
              label='Painting'
            />
            <CardItem
              src='https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/40115/article_full%401x.jpg'
              text='Cannot wait to try these out on the stage'
              label='Comedy'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
