import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NavBarIcon from "../NavBarIcon/NavBarIcon.jsx";
import "./NavBar.css";
import DropdownButton from "../DropdownButton/DropdownButton.jsx";
import CategoryRow from "../CategoryRow/CategoryRow.jsx";

const placeHolderCategoryImage = "../../public/shopping_cart_hover.png";

const NavBar = ({
  HandleFavoritesClick,
  HandleProfileClick,
  HandleShoppingCartClick,
  notifications,
}) => {
  return (
    <div className="nav_bar">
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
        className="imagineLogo"
        src="../../../public/logo.png"
        subcategories={[]}
      />
      <SearchBar />
      <NavBarIcon
        nrNotifications={notifications[0]}
        onClick={HandleProfileClick}
        className="noShrink"
        text="Profile"
        imgSrc="../../../public/profile.png"
        hoverImgSrc="../../../public/profile_hover.png"
      ></NavBarIcon>
      <NavBarIcon
        nrNotifications={notifications[1]}
        onClick={HandleFavoritesClick}
        className="noShrink"
        text="Favorites"
        imgSrc="../../../public/favorites.png"
        hoverImgSrc="../../../public/favorites_hover.png"
      ></NavBarIcon>
      <NavBarIcon
        nrNotifications={notifications[2]}
        onClick={HandleShoppingCartClick}
        className="noShrink"
        text="Shopping Cart"
        imgSrc="../../../public/shopping_cart.png"
        hoverImgSrc="../../../public/shopping_cart_hover.png"
      ></NavBarIcon>
    </div>
  );
};

export default NavBar;
