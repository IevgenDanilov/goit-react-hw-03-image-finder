import React from "react";
import PropTypes from "prop-types";

const ErrorNotification = ({ text }) => (
  <h1 className="Error">Whoops, something went wrong: {text}</h1>
);

export default ErrorNotification;

ErrorNotification.propTypes = {
  text: PropTypes.string,
};
