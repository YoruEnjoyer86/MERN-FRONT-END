import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NavBarIcon from "../NavBarIcon/NavBarIcon.jsx";
import "./NavBar.css";
import DropdownButton from "../DropdownButton/DropdownButton.jsx";
import CategoryRow from "../CategoryRow/CategoryRow.jsx";
import { useNavigate } from "react-router-dom";

const placeHolderCategoryImage = "../../public/shopping_cart_hover.png";

const NavBar = ({ notifications, className = "" }) => {
  const navigate = useNavigate();

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

  return (
    <div className={"nav_bar " + className}>
      <DropdownButton img="../../public/three_lines.png">
        <CategoryRow
          name="Laptop/Tablete"
          image={placeHolderCategoryImage}
          subcategories={["Laptop", "Telefoane Mobile"]}
        />
        <CategoryRow
          name="PC/Periferice"
          image={placeHolderCategoryImage}
          subcategories={["Mouse", "Tastatura", "Monitoare"]}
        />
        <CategoryRow
          name="Alimente"
          image={placeHolderCategoryImage}
          subcategories={["Lactate", "Carne", "Snacks-uri"]}
        />
        <CategoryRow
          name="Îmbrăcăminte"
          image={placeHolderCategoryImage}
          subcategories={["Pantofi", "Paltoane", "Slapi"]}
        />
      </DropdownButton>
      <img
        className="logo_image"
        src="../../../public/logo.png"
        subcategories={[]}
        onClick={HandleLogoClick}
      />
      <SearchBar />
      <NavBarIcon
        nrNotifications={notifications[0]}
        onClick={HandleProfileClick}
        className="noShrink"
        text=""
        imgSrc="../../../public/profile.png"
        hoverImgSrc="../../../public/profile_hover.png"
      ></NavBarIcon>
      <NavBarIcon
        nrNotifications={notifications[1]}
        onClick={HandleFavoritesClick}
        className="noShrink"
        text=""
        imgSrc="../../../public/favorites.png"
        hoverImgSrc="../../../public/favorites_hover.png"
      ></NavBarIcon>
      <NavBarIcon
        nrNotifications={notifications[2]}
        onClick={HandleShoppingCartClick}
        className="noShrink"
        text=""
        imgSrc="../../../public/shopping_cart.png"
        hoverImgSrc="../../../public/shopping_cart_hover.png"
      ></NavBarIcon>
      <NavBarIcon
        nrNotifications={0}
        onClick={HandleGoToAddProductToDatabase}
        className="noShrink"
        text=""
        imgSrc="../../../public/upload_image.png"
        hoverImgSrc="../../../public/upload_image_hover.png"
      ></NavBarIcon>
    </div>
  );
};

export default NavBar;
