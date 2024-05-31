import React, { useContext, useEffect, useState } from "react";
import "./DropdownButton.css";
import Modal from "../Modal/Modal";
import { AppContext } from "../../Contexts/AppContext";

const DropdownButton = ({
  button,
  children,
  className,
  isBackgroundVisible = false,
}) => {
  const [isOpen, setOpen] = useState(false);
  const HandleOnClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div
      onMouseEnter={() => {
        setOpen(true);
      }}
      onClick={HandleOnClick}
      className={"drop_down_button_container " + className}
    >
      {<div className="drop_down_image">{button}</div>}
      {isOpen && (
        <Modal
          isBackgroundVisible={isBackgroundVisible}
          onMouseLeave={() => {
            setOpen(false);
          }}
        >
          {children}
        </Modal>
      )}
    </div>
  );
};

export default DropdownButton;
