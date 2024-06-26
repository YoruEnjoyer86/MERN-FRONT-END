import { React, useEffect, useState } from "react";
import "./order_completed.css";
import NavBar from "../../components/NavBar/NavBar";

const Order_completed = () => {
  const [lists, setLists] = useState([]);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [currentListProducts, setCurrentListProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="order_completed_page">
      <NavBar />
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
