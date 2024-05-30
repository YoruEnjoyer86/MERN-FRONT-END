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
  const { setOnLickFunction, invisibleBoxOnClick } = useContext(AppContext);

  const HandleOnClick = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    let newInvisibleBoxClick = () => {
      invisibleBoxOnClick();
      console.log("closed drop down button on invisible box click!");
      setOpen(false);
    };
    console.log("added onCLICK TO INVISIBLE BOX FROM DROPDOWN BUTTOn");
    setOnLickFunction(newInvisibleBoxClick);
  }, []);

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
        <Modal isBackgroundVisible={isBackgroundVisible}>{children}</Modal>
      )}
    </div>
  );
};

export default DropdownButton;
