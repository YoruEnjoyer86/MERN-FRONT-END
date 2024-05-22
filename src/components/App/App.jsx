import React, { useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./App.css";

const App = ({ children }) => {
  const [cartNotifications, setCartNotifications] = useState(0);

  console.log("SADAS");
  return (
    <AppContext.Provider value={cartNotifications}>
      <span className="space_for_navBar"></span>
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export default App;
