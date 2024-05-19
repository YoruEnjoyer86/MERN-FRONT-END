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
        <p>My payment methods</p>
      </div>
      <div className="user_option" onClick={OnGoToAddresses}>
        <p>My adresses</p>
      </div>
      <div className="user_option" onClick={OnGoToReviews}>
        <p>My reviews</p>
      </div>
      <div className="user_option" onClick={OnGoToOrders}>
        <p>My orders</p>
      </div>
      <div className="user_option" onClick={OnLogout}>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default UserOptionsColumn;
