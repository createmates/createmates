import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Form from "./Form";

/**
 * COMPONENT
 */
export const UserHome = () => {
  return (
    <div>
      <h3>What do you want to create today?</h3>
      <Form />
    </div>
  );
};

export default UserHome;
