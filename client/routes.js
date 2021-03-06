import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { Login } from "./components/AuthForm";
import UserHome from "./components/UserHome";
import { me } from "./store";
import Session from "./components/Session";
import Feed from "./components/Feed"
import UserAccount from './components/UserAccount'
import SignUpForm from './components/SignUpForm'
import Summary from './components/Summary'
import SignUpAccountInfo from "./components/SignUpAccountInfo";
import SignUpFeedGuide from "./components/SignUpFeedGuide";
import Home from './components/Home'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUpForm} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Home} />
            <Route path="/sessionSummary" component={Summary} />
            <Route exact path="/create" component={UserHome} />
            <Route path="/session" component={Session} />
            <Route path="/feed" component={Feed} />
            <Route path="/myAccount" component={UserAccount} />
            <Route path="/startMyAccount" component={SignUpAccountInfo} />
            <Route path='/signUpFeedGuide' component={SignUpFeedGuide} />
            <Route path="/:userId" component={UserAccount} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="/create" component={Login} />
        <Route component={Home} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
