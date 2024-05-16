import React, { useEffect } from "react";
import { useState } from "react";
import "./home.css";
import ProductsRow from "../../components/ProductsRow/ProductsRow.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import axios from "axios";

const GetImageForProduct = (product) => {
  return "../../../" + product.name + "_" + product.seller + ".png";
};

const GetProducts = () => {
  //TODO IA PRODUSE
  // asat sfjsilhfishfhsbfshfojshfhsjfwjefjer 0000000000000000000000000000000000000000000000000000000000
  //ana are mere
  //ana nu are mere e adhsahdashasd

  return products;
};

const Home = () => {
  let [productsFromBackEnd, setProductsFromBackEnd] = useState([]);
  let [foodProducts, setFoodProducts] = useState([]);

  const HandleAddItemToCart = (productName) => {
    setCartNotifications(cartNotifications + 1);
    alert("Added " + productName + " to your cart!");
  };

  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);

  return (
    <div className="home">
      <NavBar
        notifications={[
          profileNotifications,
          favoritesNotifications,
          cartNotifications,
        ]}
      />
      <ProductsRow
        maxDisplayedItems={5}
        products={productsFromBackEnd}
        HandleAddItemToCart={HandleAddItemToCart}
        category="Everything"
      />
      <ProductsRow
        maxDisplayedItems={5}
        products={[]}
        HandleAddItemToCart={HandleAddItemToCart}
        category="Food"
      />
      <ProductsRow
        maxDisplayedItems={5}
        products={[]}
        HandleAddItemToCart={HandleAddItemToCart}
        category="Clothing"
      />
    </div>
  );
};

export default Home;
