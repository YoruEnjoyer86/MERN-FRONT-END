import React, { useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./App.css";
import NavBar from "../NavBar/NavBar";

let invisibleBoxOnClick = () => {
  console.log("CLICKED INVISIBLE BOX!");
};

const App = ({ children }) => {
  const [notifications, setNotification] = useState(0);
  const [isRegisterPageActive, setIsRegisterPageActive] = useState(false);
  const [invisibleBoxState, setInvisibleBoxState] = useState(false); // stateul asta o sa fie 0 sau 1, e irelevanta valoarea, il folosesc doar ca sa dea rerender unei componente
  const setOnLickFunction = (val) => {
    setInvisibleBoxState(!invisibleBoxState);
    invisibleBoxOnClick = val;
  };

  return (
    <div className="app_container">
      <AppContext.Provider
        value={{ notifications, setOnLickFunction, setIsRegisterPageActive }}
      >
        {!isRegisterPageActive && <div className="space_for_navBar"></div>}
        <div
          className="invisible_click_handler"
          onClick={(invisibleBoxState || true) && invisibleBoxOnClick} // aici indiferent de valoarea stateului, aceasi functie e folosita. Am nev de state ca sa rerenderuiasca cand se schimba functia onClick
        ></div>
        <div className="app_children_div">{children}</div>
      </AppContext.Provider>
    </div>
  );
};

export default App;
