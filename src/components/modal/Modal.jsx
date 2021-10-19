import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModal);
  }

  closeModal = (e) => {
    if (e.key === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, children } = this.props;
    return (
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
