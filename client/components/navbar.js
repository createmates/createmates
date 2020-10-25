import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../store";
import { getProfileThunk } from '../store/profile'

const Navbar = ({ handleClick, handleClickAccount, isLoggedIn, singleSession, isAdmin, user }) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/home">
        {/* <img src="/public/images/sin_wavetable.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"/> */}
        CREATEMATES
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
      {isLoggedIn ? (
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          {/* The navbar will show these links after you log in */}


             <a className="nav-link active" href="/create">Create<span className="sr-only">(current)</span></a>

             <a className="nav-link" href="/myAccount" onClick={handleClickAccount(user.id)}>My Account<span className="sr-only">(current)</span></a>

             <a className="nav-link" href="/feed">Match with a Mate<span className="sr-only">(current)</span></a>
             {singleSession.id ? <a className="nav-link" href="/session">Return to Session<span className="sr-only">(current)</span></a> : ''}

             <a className="nav-link" href="#" onClick={handleClick}>Logout<span className="sr-only">(current)</span></a>



        </div>
        </div>
      ) : (
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <a className="nav-link active" href="/login">Login/SignUp<span className="sr-only">(current)</span></a>
          </div>
        </div>
      )}
    </nav>

    <hr />
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    singleSession: state.singleSession
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    handleClickAccount(userId) {
      dispatch(getProfileThunk(userId))
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
