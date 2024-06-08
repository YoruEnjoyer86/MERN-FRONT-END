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

const placeHolderCategoryImage = "../../public/shopping_cart_hover.png";

const NavBar = ({ className = "" }) => {
  const { notifications } = useContext(AppContext);
  const navigate = useNavigate();
  const [user_type, set_user_type] = useState(undefined);

  const HandleLogoClick = () => {
    navigate("/");
  };

  const HandleProfileClick = () => {
    navigate("/profile");
  };

  const HandleFavoritesClick = () => {
    navigate("/favorites");
  };

  const HandleShoppingCartClick = () => {
    navigate("/shopping_cart");
  };

  const HandleGoToAddProductToDatabase = () => {
    navigate("/add_product_to_database");
  };

  const GetUserType = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    if (res.data.ok) {
      let type_response = await axios.get(
        "http://localhost:3001/get_user_type"
      );
      set_user_type(type_response.data);
      console.log(type_response.data);
      // console.log("USER CONNECTED!");
    }
  };

  useState(() => {
    GetUserType();
  }, []);

  return (
    <div className={"nav_bar " + className}>
      <CategoriesButton />
      <img
        className="logo_image"
        src="../../../public/logo.png"
        subcategories={[]}
        onClick={HandleLogoClick}
      />
      <SearchBar />
      <NavBarIcon
        nrNotifications={notifications.profile}
        onClick={HandleProfileClick}
        className="noShrink"
        text=""
        imgSrc="../../../public/profile.png"
        hoverImgSrc="../../../public/profile_hover.png"
      ></NavBarIcon>
      {(user_type === undefined || user_type === 0) && (
        <>
          <NavBarIcon
            nrNotifications={notifications.favorites}
            onClick={HandleFavoritesClick}
            className="noShrink"
            text=""
            imgSrc="../../../public/favorites.png"
            hoverImgSrc="../../../public/favorites_hover.png"
          ></NavBarIcon>
          <NavBarIcon
            nrNotifications={notifications.cart}
            onClick={HandleShoppingCartClick}
            className="noShrink"
            text=""
            imgSrc="../../../public/shopping_cart.png"
            hoverImgSrc="../../../public/shopping_cart_hover.png"
          ></NavBarIcon>
        </>
      )}

      {user_type === 1 && (
        <NavBarIcon
          nrNotifications={0}
          onClick={HandleGoToAddProductToDatabase}
          className="noShrink"
          text=""
          imgSrc="../../../public/upload_image.png"
          hoverImgSrc="../../../public/upload_image_hover.png"
        ></NavBarIcon>
      )}
    </div>
  );
};

export default NavBar;
