import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileThunk} from '../store/profile';



function CardItem(props) {
  console.log('props baby')
  return (
    <React.Fragment>

      <li className='cards__item' key={1}>


        <div className='cards__item__link'>

          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h6 className='cards__item__text'><Link to={`/${props.users[0].id}`} onClick={()=> props.getProfile(props.users[0].id)}>{props.users[0].username}</Link> & <Link to={`/${props.users[1].id}`} onClick={()=> props.getProfile(props.users[1].id)}>{props.users[1].username}</Link></h6>
            <h5 className='cards__item__text'>"{props.text}"</h5>
            {props.tags.map(tag => <span key={tag.id} id={tag.id}>#{tag.name} </span>)}
            <p>{props.date}</p>
          </div>



        </div>

      </li>
    </React.Fragment>
  );
}

function mapState(state) {
  return {
  profile: state.profile
  }
}

function mapDispatch(dispatch) {
  return {
    getProfile: (userId) => dispatch(getProfileThunk(userId))
  }
}

export default connect(mapState, mapDispatch)(CardItem);

