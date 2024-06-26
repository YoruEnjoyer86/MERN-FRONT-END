import React, { useEffect, useRef, useState } from "react";
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
  let min_width_for_scale_down = useRef(600);
  const [window_size, set_window_size] = useState({
    height: undefined,
    width: undefined,
  });
  const setOnLickFunction = (val) => {
    invisibleBoxOnClick = val;
    setInvisibleBoxState(!invisibleBoxState);
  };
  let initial_rem = -1;

  useEffect(() => {
    // console.log("SEARCH DATA UPDATED", search_data);
  }, [search_data]);

  const Initialize = async () => {
    // let res = await axios.get(base_url + "/get_search_data");
    let local_search_data = localStorage.getItem("search_data");
    set_search_data(local_search_data);
    set_product_page_product_id(
      localStorage.getItem("product_page_product_id")
    );
    // console.log(res.data.search_categories);
  };

  const OnWindowSizeChange = () => {
    console.log(min_width_for_scale_down.current);
    // console.log(
    //   "rem : " + window.getComputedStyle(document.documentElement).fontSize
    // );
    set_window_size({ height: window.innerHeight, width: window.innerWidth });
    if (initial_rem === -1)
      initial_rem = parseInt(
        window.getComputedStyle(document.documentElement).fontSize.split("p")[0]
      );
    // console.log(initial_rem);
    if (window.innerWidth < min_width_for_scale_down.current) {
      document.documentElement.style.fontSize =
        String(
          (window.innerWidth / min_width_for_scale_down.current) * initial_rem
        ) + "px";
      console.log(window.innerWidth / min_width_for_scale_down.current);
    } else document.documentElement.style.fontSize = String(initial_rem) + "px";
  };

  useEffect(() => {
    Initialize();
    addEventListener("resize", OnWindowSizeChange);
    OnWindowSizeChange();
    return () => {
      removeEventListener("resize", OnWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    // console.log("PROD PAGE P ID : ", product_page_product_id);
  }, [product_page_product_id]);

  const CheckUserConnected = async () => {
    let token = localStorage.getItem("access_token");
    let res = await axios.get(base_url + "/check_connected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.ok;
  };

  const AddProductToCart = async (productId) => {
    console.log("ADDING ITEM TO CART");
    let token = localStorage.getItem("access_token");
    let res = await axios.post(
      base_url + "/increase_product_quantity_in_cart",
      {
        id: productId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
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
          set_notifications,
          window_size,
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
