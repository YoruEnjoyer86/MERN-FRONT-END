import React, { useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./App.css";

let invisibleBoxOnClick = () => {
  console.log("CLICKED INVISIBLE BOX!");
};

const App = ({ children }) => {
  const [cartNotifications, setCartNotifications] = useState(0);
  const [invisibleBoxState, setInvisibleBoxState] = useState(false); // stateul asta o sa fie 0 sau 1, e irelevanta valoarea, il folosesc doar ca sa dea rerender unei componente
  const setOnLickFunction = (val) => {
    setInvisibleBoxState(!invisibleBoxState);
    invisibleBoxOnClick = val;
  };

  return (
    <AppContext.Provider value={{ cartNotifications, setOnLickFunction }}>
      {window.location.href !== "http://localhost:5173/register" && (
        <span className="space_for_navBar"></span>
      )}
      <div
        className="invisible_click_handler"
        onClick={(invisibleBoxState || true) && invisibleBoxOnClick} // aici indiferent de valoarea stateului, aceasi functie e folosita. Am nev de state ca sa rerenderuiasca cand se schimba functia onClick
      ></div>
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export default App;
