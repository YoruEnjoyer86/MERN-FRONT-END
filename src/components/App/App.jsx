import React, { useEffect, useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./App.css";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

let invisibleBoxOnClick = () => {
  console.log("CLICKED INVISIBLE BOX!");
};

const App = ({ children }) => {
  const [notifications, setNotification] = useState(0);
  const [isRegisterPageActive, setIsRegisterPageActive] = useState(false);
  const [invisibleBoxState, setInvisibleBoxState] = useState(false); // stateul asta o sa fie 0 sau 1, e irelevanta valoarea, il folosesc doar ca sa dea rerender unei componente
  const [search_data, set_search_data] = useState(undefined);
  const [appliedSearchFilters, setAppliedSearchFilters] = useState({});
  const setOnLickFunction = (val) => {
    setInvisibleBoxState(!invisibleBoxState);
    invisibleBoxOnClick = val;
  };

  useEffect(() => {
    // console.log("SEARCH DATA UPDATED", search_data);
  }, [search_data]);

  const Initialize = async () => {
    let res = await axios.get("http://localhost:3001/get_search_data");
    set_search_data(res.data.search_data);
    // console.log(res.data.search_categories);
  };

  useEffect(() => {
    Initialize();
  }, []);

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    return res.data.ok;
  };

  const AddProductToCart = async (productId) => {
    if ((await CheckUserConnected()) == false) {
      navigate("/register");
      return;
    }
    console.log("ADDING ITEM TO CART");
    let res = await axios.post(
      "http://localhost:3001/increase_product_quantity_in_cart",
      {
        id: productId,
      }
    );
    console.log(res.data);
  };

  return (
    <div className="app_container">
      <AppContext.Provider
        value={{
          notifications,
          setOnLickFunction,
          setIsRegisterPageActive,
          search_data,
          set_search_data,
          AddProductToCart,
          appliedSearchFilters,
          setAppliedSearchFilters,
        }}
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
