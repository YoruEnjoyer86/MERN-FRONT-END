import React from "react";
import "./UserOptionsColumn.css";

const UserOptionsColumn = ({ OnLogout }) => {
  const OnGoToPaymentMethods = () => {
    alert("GOING TO PAYMENT METHODS!");
  };
  const OnGoToAddresses = () => {
    alert("GOING TO MY ADDRESSES!");
  };
  const OnGoToReviews = () => {
    alert("GOING TO REVIEWS!");
  };
  const OnGoToOrders = () => {
    alert("GOING TO MY ORDERS!");
  };

  return (
    <div className="user_options_column">
      <div className="user_option" onClick={OnGoToPaymentMethods}>
        <p className="user_option_text">Favorites</p>
      </div>
      <div className="user_option" onClick={OnGoToPaymentMethods}>
        <p className="user_option_text">Cart</p>
      </div>
      <div className="user_option" onClick={OnGoToPaymentMethods}>
        <p className="user_option_text">Payment methods</p>
      </div>
      <div className="user_option" onClick={OnGoToAddresses}>
        <p className="user_option_text">Adresses</p>
      </div>
      <div className="user_option" onClick={OnGoToReviews}>
        <p className="user_option_text">Reviews</p>
      </div>
      <div className="user_option" onClick={OnGoToOrders}>
        <p className="user_option_text">Orders</p>
      </div>
      <div className="user_option" onClick={OnLogout}>
        <p className="user_option_text">Logout</p>
      </div>
    </div>
  );
};

export default UserOptionsColumn;
