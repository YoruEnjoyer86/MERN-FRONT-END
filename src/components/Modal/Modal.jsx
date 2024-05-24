import React, { Children } from "react";
import "./Modal.css";
const Modal = ({ children, isBackgroundVisible }) => {
  return (
    <div
      className={
        "modal_container " + (isBackgroundVisible ? "colored_background" : "")
      }
    >
      {children}
    </div>
  );
};

export default Modal;
