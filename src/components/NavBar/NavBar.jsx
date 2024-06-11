import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NavBarIcon from "../NavBarIcon/NavBarIcon.jsx";
import "./NavBar.css";
import DropdownButton from "../DropdownButton/DropdownButton.jsx";
import MegaCategoryRow from "../MegaCategoryRow/MegaCategoryRow.jsx";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext.js";
import axios from "axios";
import CategoriesButton from "../CategoriesButton/CategoriesButton.jsx";
import base_url from "../../base_url.js";

const placeHolderCategoryImage = "/shopping_cart_hover.png";

const NavBar = ({ className = "" }) => {
  const { notifications } = useContext(AppContext);
  const navigate = useNavigate();
  const [user_type, set_user_type] = useState(undefined);

  const HandleLogoClick = () => {
    navigate("/");
  };

  const CheckConnected = async () => {
    let token = localStorage.getItem("access_token");
    let response = await axios.post(base_url + "/check_connected", {
      token,
    });
    return response.data.ok === true;
  };

  const HandleProfileClick = async () => {
    if ((await CheckConnected()) === true) navigate("/profile");
    else navigate("/register");
  };

  const HandleFavoritesClick = async () => {
    if ((await CheckConnected()) === true) navigate("/favorites");
    else navigate("/register");
  };

  const HandleShoppingCartClick = async () => {
    if ((await CheckConnected()) === true) navigate("/shopping_cart");
    else navigate("/register");
  };

  const HandleGoToAddProductToDatabase = async () => {
    if ((await CheckConnected()) === true) navigate("/add_product_to_database");
    else navigate("/register");
  };

  const GetUserType = async () => {
    // console.log("GETTING USER TYPE👌");
    let token = localStorage.getItem("access_token");
    let type_response = await axios.post(base_url + "/get_user_type", {
      token,
    });
    if (type_response.data != undefined) set_user_type(type_response.data);
    // console.log("USER TYPE IS : " + type_response.data);
    // console.log("USER CONNECTED!");
  };

  useState(() => {
    GetUserType();
  }, []);

  return (
    <div className={"nav_bar " + className}>
      <CategoriesButton />
      <img
        className="logo_image"
        src="/logo.png"
        subcategories={[]}
        onClick={HandleLogoClick}
      />
      <SearchBar />
      <NavBarIcon
        nrNotifications={notifications.profile}
        onClick={HandleProfileClick}
        className="noShrink"
        text=""
        imgSrc="/profile.png"
        hoverImgSrc="/profile_hover.png"
      ></NavBarIcon>
      {(user_type === undefined || user_type === 0) && (
        <>
          <NavBarIcon
            nrNotifications={notifications.favorites}
            onClick={HandleFavoritesClick}
            className="noShrink"
            text=""
            imgSrc="/favorites.png"
            hoverImgSrc="/favorites_hover.png"
          ></NavBarIcon>
          <NavBarIcon
            nrNotifications={notifications.cart}
            onClick={HandleShoppingCartClick}
            className="noShrink"
            text=""
            imgSrc="/shopping_cart.png"
            hoverImgSrc="/shopping_cart_hover.png"
          ></NavBarIcon>
        </>
      )}

      {user_type === 1 && (
        <NavBarIcon
          nrNotifications={0}
          onClick={HandleGoToAddProductToDatabase}
          className="noShrink"
          text=""
          imgSrc="/upload_image.png"
          hoverImgSrc="/upload_image_hover.png"
        ></NavBarIcon>
      )}
    </div>
  );
};

export default NavBar;
