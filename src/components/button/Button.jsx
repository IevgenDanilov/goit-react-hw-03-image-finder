import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className="Button">
    Load more
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
