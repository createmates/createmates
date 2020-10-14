import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin, user }) => (
  <div>
    <div className="main-header">
      <h1>CreateMates</h1>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/feed">Feed</Link>
          <Link to={`/${user.id}`}>My Account</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>

        </div>
      ) : (
        <div>{/* The navbar will show these links before you log in */}</div>
      )}
    </nav>
    <hr />
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
