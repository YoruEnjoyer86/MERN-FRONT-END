import React, { useEffect, useState } from "react";
import "./shopping_cart.css";
import "./shopping_cart.css";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import ProductsDeliveredBySellerColumn from "../../components/ProductsDeliveredBySellerColumn/ProductsDeliveredBySellerColumn";
import { useNavigate } from "react-router-dom";

const shopping_cart = () => {
  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);
  //SCHIMBA, FA-L STATE GLOBAL
  const [productsSortedBySeller, setproductsSortedBySeller] = useState([]);
  const [totalProductPrice, setTotaProductPrice] = useState(0);

  const navigate = new useNavigate();

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    console.log("CONNECTED : " + res.data.ok);
    return res.data.ok;
  };

  const HandleContinueOrder = () => {
    navigate("/order_completed");
  };

  const Initialize = async () => {
    if ((await CheckUserConnected()) == true) GetProductsFromBackend();
    else navigate("/register");
  };

  useEffect(() => {
    Initialize();
  }, []);

  const GetProductsFromBackend = async () => {
    let res = await axios.post(
      "http://localhost:3001/api/get_products_of_category",
      {
        category: "everything",
      }
    );
    let products = res.data;
    let prodSellerMap = new Map();
    products.forEach((product) => {
      if (prodSellerMap.has(product.seller) === false)
        prodSellerMap.set(product.seller, [product]);
      else {
        let newVal = prodSellerMap.get(product.seller);
        newVal.push(product);
        prodSellerMap.set(product.seller, newVal);
      }
    });
    let newSellerProducts = [];
    for (let [seller, products] of prodSellerMap)
      newSellerProducts.push({ seller, products });
    setproductsSortedBySeller(newSellerProducts);
  };

  useEffect(() => {
    //console.log(productsSortedBySeller);
    let newTotalPrice = 0;
    for (let p = 0; p < productsSortedBySeller.length; p++) {
      let products = productsSortedBySeller[p].products;
      for (let i = 0; i < products.length; i++)
        newTotalPrice += products[i].quantity > 0 ? products[i].price : 0;
    }
    setTotaProductPrice(newTotalPrice);
  }, [productsSortedBySeller]);

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
      <div className="contents_row">
        <div className="left_column">
          <p className="title">Your Cart</p>
          {productsSortedBySeller.map((value, index) => (
            <ProductsDeliveredBySellerColumn
              seller={value.seller}
              products={value.products}
              key={index}
            />
          ))}
        </div>
        <div className="right_column">
          <p className="order_summary_text">Order Summary</p>
          <div className="cost_row">
            <p className="cost_row_text">Product cost : </p>
            <span className="space_between_cost" />
            <p className="cost_row_text">{totalProductPrice}</p>
          </div>
          <div className="cost_row">
            <p className="cost_row_text">Delivery cost : </p>
            <span className="space_between_cost" />
            <p className="cost_row_text">99.99 LEI</p>
          </div>
          <p className="order_summary_text">Total:</p>
          <p className="price_text">{totalProductPrice}</p>
          <button className="continue_button" onClick={HandleContinueOrder}>
            {" "}
            Continue{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default shopping_cart;
