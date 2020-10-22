import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <React.Fragment>
      <li className='cards__item'>
        <Link to={props.path} className='cards__item__link'>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h6 className='cards__item__text'><Link to={`/${props.users[0].id}`}>{props.users[0].username}</Link> • • • <Link to={`/${props.users[1].id}`}>{props.users[1].username}</Link></h6>
            <h5 className='cards__item__text'>"{props.text}"</h5>
            {props.tags.map(tag => <span id={tag.id}>#{tag.name} </span>)}
            <p>{props.date}</p>
          </div>
        </Link>
      </li>
    </React.Fragment>
  );
}

export default CardItem;
