import React, { Children } from "react";
import "./Modal.css";
const Modal = ({ children, isBackgroundVisible, onMouseLeave }) => {
  return (
    <div
      onMouseLeave={onMouseLeave}
      className={
        "modal_container " + (isBackgroundVisible ? "colored_background" : "")
      }
    >
      {children}
    </div>
  );
};

export default Modal;
