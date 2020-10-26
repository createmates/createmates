import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileThunk} from '../store/profile';



function CardItem(props) {
  return (
       <div>
          <img className="card-img-top" src={props.src}/>
          <div className="card mb-2">
            <div className="card-body">
            <h4 className="card-title text-center">
            <Link to={`/${props.users[0].id}`} onClick={()=> props.getProfile(props.users[0].id)}>{props.users[0].username}</Link> & <Link to={`/${props.users[1].id}`} onClick={()=> props.getProfile(props.users[1].id)}>{props.users[1].username}</Link>
            </h4>
            <p className="card-text text-center text-dark">
            "{props.text}"
            </p>
            <p className="text-center">
            {props.tags.map(tag => <span className="text-center" key={tag.id} id={tag.id}>#{tag.name} </span>)}
            </p>
            <p className="text-center">
            {props.date}
            </p>
            </div>
          </div>
       </div>
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

