import React from "react";
import "./shopping_cart.css";
import { useState } from "react";
import "./shopping_cart.css";
import NavBar from "../../components/NavBar/NavBar";

const shopping_cart = () => {
  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);
  return (
    <div className="shopping_cart_page">
      <NavBar
        className="no_margin"
        notifications={[
          profileNotifications,
          favoritesNotifications,
          cartNotifications,
        ]}
      />
      <p>Shopping CART!</p>
    </div>
  );
};

export default shopping_cart;
