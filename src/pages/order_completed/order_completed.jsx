import { React, useState } from "react";
import "./order_completed.css";
import NavBar from "../../components/NavBar/NavBar";

const Order_completed = () => {
  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);
  const [lists, setLists] = useState([]);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [currentListProducts, setCurrentListProducts] = useState([]);
  return (
    <div className="order_completed_page">
      <NavBar
        className="no_margin"
        notifications={[
          profileNotifications,
          favoritesNotifications,
          cartNotifications,
        ]}
      />
      <div className="page_content">
        <div className="order_completed_column">
          <p className="order_completed_text">Your order has been completed!</p>
          <div className="order_number_row">
            <p className="order_completed_text">The order number is:</p>
            <p className="order_number_text">EY129sFF2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order_completed;
