import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-center border border-light p-5" name={name}>
        <p className="h4 mb-4">Sign in</p>
        <div>
          <label htmlFor="email">
          </label>
          <input type="email" name="email" id="defaultLoginFormEmail" className="form-control mb-4" type="text" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">
          </label>
          <input type="password" name="password" id="defaultLoginPassword" className="form-control mb-4" placeholder="Password" />
        </div>
        <div className="d-flex justify-content-around">
          <div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember"/>
              <label className="custom-control-label" htmlFor="defaultLoginFormRemember">Remember me</label>
            </div>
          </div>
          <div>
            <a href="">Forgot password?</a>
          </div>
          </div>
          <button className="btn btn-info btn-block my-4" type="submit">{displayName}</button>
          <p>Not a member?
          <Link to="/signup">   Sign Up   </Link>
          </p>
          {error && error.response && <div> {error.response.data} </div>}
          <a href="/auth/google"><button type="button" className="btn btn-info btn-google btn-block btn-outline my-4"><img src="https://img.icons8.com/color/16/000000/google-logo.png"/>{displayName} with Google</button></a>




      </form>


    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
  };
};


const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
