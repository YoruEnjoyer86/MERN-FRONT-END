import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./favorites.css";
import { useState } from "react";

const favorites = () => {
  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);

  return (
    <div className="favorites_page">
      <NavBar
        className="no_margin"
        notifications={[
          profileNotifications,
          favoritesNotifications,
          cartNotifications,
        ]}
      />
      <p>favorites</p>
    </div>
  );
};

export default favorites;
