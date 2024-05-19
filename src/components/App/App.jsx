import React, { useState } from "react";
import { AppContext } from "../../Contexts/AppContext";

const App = ({ children }) => {
  const [cartNotifications, setCartNotifications] = useState(0);

  console.log("SADAS");
  return (
    <AppContext.Provider value={cartNotifications}>
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export default App;
