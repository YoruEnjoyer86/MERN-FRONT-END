import React, { useState } from "react";
import "./DropdownButton.css";
import Modal from "../Modal/Modal";

const DropdownButton = ({ img, children }) => {
  const [isOpen, setOpen] = useState(false);

  const HandleOnClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div onClick={HandleOnClick} className="drop_down_button_container">
      <img className="drop_down_image" src={img} />
      {isOpen && <Modal>{children}</Modal>}
    </div>
  );
};

export default DropdownButton;
