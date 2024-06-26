import React, { useContext, useEffect, useState } from "react";
import "./shopping_cart.css";
import "./shopping_cart.css";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import ProductsDeliveredBySellerColumn from "../../components/ProductsDeliveredBySellerColumn/ProductsDeliveredBySellerColumn";
import { useNavigate } from "react-router-dom";
import base_url from "../../base_url";
import { AppContext } from "../../Contexts/AppContext";

const shopping_cart = () => {
  const [productsSortedBySeller, setproductsSortedBySeller] = useState([]);
  const [sellerProductsQuantity, setSellerProductsQuantity] = useState([]);
  const [totalProductPrice, setTotaProductPrice] = useState(0);
  const { set_notifications, notifications } = useContext(AppContext);

  const navigate = new useNavigate();

  const CheckUserConnected = async () => {
    let token = localStorage.getItem("access_token");
    let res = await axios.get(base_url + "/check_connected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    //console.log("CONNECTED : " + res.data.ok);
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
    set_notifications({
      ...notifications,
      cart: 0,
    });
    Initialize();
    window.scrollTo(0, 0);
    // console.log("AHAAHAH");
  }, []);

  const GetProductsFromBackend = async () => {
    let token = localStorage.getItem("access_token");
    let res = await axios.get(base_url + "/get_products_from_cart", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    let products = res.data.products;
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

  const CalculateProductsPriceWithoutDelivery = () => {
    let price = 0;
    if (productsSortedBySeller.length == 0) return;
    console.log(productsSortedBySeller[0].products);
    // if (productsSortedBySeller == []) return;
    // console.log(productsSortedBySeller[0].products);
    for (let i = 0; i < productsSortedBySeller.length; i++)
      for (let j = 0; j < productsSortedBySeller[i].products.length; j++) {
        price +=
          productsSortedBySeller[i].products[j].quantity > 0
            ? productsSortedBySeller[i].products[j].price *
              sellerProductsQuantity[i][j]
            : 0;
      }
    // console.log("new price " + price);
    price = price.toFixed(2);
    setTotaProductPrice(price);
  };

  useEffect(() => {
    setSellerProductsQuantity(
      productsSortedBySeller.map((pair) =>
        pair.products.map((prod) => prod.cartQuantity)
      )
    );

    // console.log("PRODUCTS CHANGED!");
  }, [productsSortedBySeller]);

  useEffect(() => {
    // console.log("PRODUCTS QUANTITY CHANGED!");
    CalculateProductsPriceWithoutDelivery();
  }, [sellerProductsQuantity]);

  return (
    <div className="shopping_cart_page">
      <NavBar />
      <div className="contents_row">
        {productsSortedBySeller.length > 0 ? (
          <>
            <div className="left_column">
              <div className="title_container">
                <p className="title">Your Cart</p>
                <div className="title_underline"></div>
              </div>
              {productsSortedBySeller.map((value, index) => (
                <ProductsDeliveredBySellerColumn
                  seller={value.seller}
                  products={value.products}
                  key={index}
                  sellerIndex={index}
                  sellerProductsQuantity={sellerProductsQuantity}
                  setSellerProductsQuantity={setSellerProductsQuantity}
                  priceWithoutDelivery={totalProductPrice}
                  fetchProductsFromBackend={GetProductsFromBackend}
                />
              ))}
            </div>
            <div className="right_column">
              <p className="order_summary_text">Order Summary</p>
              <div className="cost_row">
                <p className="cost_row_text">Product cost: </p>
                <span className="space_between_cost" />
                <p className="cost_row_text">{totalProductPrice}</p>
              </div>
              <div className="cost_row">
                <p className="cost_row_text">Delivery cost: </p>
                <span className="space_between_cost" />
                <p className="cost_row_text">
                  0 <span className="delivery_cost_dollar_sign">$</span>
                </p>
              </div>
              <p className="order_summary_text total_price_text">
                Total:
                <span className="shopping_cart_price_text">
                  {totalProductPrice}
                  <span className="dollar_symbol_text">$</span>
                </span>
              </p>

              <button className="continue_button" onClick={HandleContinueOrder}>
                Continue
              </button>
            </div>
          </>
        ) : (
          <div className="no_products_modal">
            <p className="no_products">You have no products in your cart!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default shopping_cart;
