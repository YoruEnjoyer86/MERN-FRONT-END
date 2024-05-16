import { React, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import AccountDetailsCard from "../../components/AccountDetailsCard/AccountDetailsCard";
import UserOptionsColumn from "../../components/UserOptionsColumn/UserOptionsColumn";
import "./profile.css";

const profile = () => {
  const navigate = useNavigate();

  const HandleProfileClick = () => {
    navigate("/profile");
  };

  const HandleFavoritesClick = () => {
    navigate("/favorites");
  };

  const HandleShoppingCartClick = () => {
    navigate("/shopping_cart");
  };
  const HandleAddItemToCart = (productName) => {
    setCartNotifications(cartNotifications + 1);
    alert("Added " + productName + " to your cart!");
  };

  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);

  return (
    <div className="profile_page">
      <NavBar
        notifications={[
          profileNotifications,
          favoritesNotifications,
          cartNotifications,
        ]}
      />
      <div className="row_thing">
        <UserOptionsColumn />
        <AccountDetailsCard />
      </div>
    </div>
  );
};

export default profile;
