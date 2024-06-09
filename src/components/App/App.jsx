import React, { useEffect, useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import "./App.css";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import base_url from "../../base_url";

let invisibleBoxOnClick = () => {
  console.log("CLICKED INVISIBLE BOX!");
};

const App = ({ children }) => {
  const [notifications, set_notifications] = useState({
    profile: 0,
    cart: 0,
    favorites: 0,
  });
  const [isRegisterPageActive, setIsRegisterPageActive] = useState(false);
  const [invisibleBoxState, setInvisibleBoxState] = useState(false); // stateul asta o sa fie 0 sau 1, e irelevanta valoarea, il folosesc doar ca sa dea rerender unei componente
  const [search_data, set_search_data] = useState(undefined);
  const [appliedSearchFilters, setAppliedSearchFilters] = useState({});
  const [product_page_product_id, set_product_page_product_id] =
    useState(undefined);
  const setOnLickFunction = (val) => {
    invisibleBoxOnClick = val;
    setInvisibleBoxState(!invisibleBoxState);
  };

  useEffect(() => {
    // console.log("SEARCH DATA UPDATED", search_data);
  }, [search_data]);

  const Initialize = async () => {
    let res = await axios.get(base_url + "/get_search_data");
    set_search_data(res.data.search_data);
    res = await axios.get(base_url + "/get_product_page_product_id");
    set_product_page_product_id(res.data);
    // console.log(res.data.search_categories);
  };

  useEffect(() => {
    Initialize();
  }, []);

  useEffect(() => {
    // console.log("PROD PAGE P ID : ", product_page_product_id);
  }, [product_page_product_id]);

  const CheckUserConnected = async () => {
    let res = await axios.get(base_url + "/check_connected");
    return res.data.ok;
  };

  const AddProductToCart = async (productId) => {
    console.log("ADDING ITEM TO CART");
    let res = await axios.post(
      base_url + "/increase_product_quantity_in_cart",
      {
        id: productId,
      }
    );
    set_notifications({
      profile: notifications.profile,
      favorites: notifications.favorites,
      cart: notifications.cart + 1,
    });
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
          product_page_product_id,
          set_product_page_product_id,
          CheckUserConnected,
          invisibleBoxOnClick,
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