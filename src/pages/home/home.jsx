import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./home.css";
import ProductsRow from "../../components/ProductsRow/ProductsRow.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../../Contexts/HomeContext.js";
import MainSales from "../../components/MainSales/MainSales.jsx";
import ClothesOffer from "../../components/ProductsOffer/ProductsOffer.jsx";
import ProductsOffer from "../../components/ProductsOffer/ProductsOffer.jsx";
import base_url from "../../base_url.js";

const GetProducts = () => {
  return products;
};

const GetFeaturedCategories = () => {
  //TODO 06.06.2024
};

const Home = () => {
  const navigate = useNavigate();
  let [productsFromBackEnd, setProductsFromBackEnd] = useState([]);
  const popularCategoriesIDs = [
    "665064a513faede67f9ef7c3",
    "665064c313faede67f9ef7c4",
  ];

  const GetFeaturedCategories = () => {
    return ["6650660c13faede67f9ef7d1", "6650659013faede67f9ef7ca"];
  };

  const CheckUserConnected = async () => {
    let token = localStorage.getItem("access_token");
    let res = await axios.get(base_url + "/check_connected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.ok;
  };

  const AddToCurrentlyDisplayedProducts = async (newProducts) => {
    setProductsFromBackEnd([...productsFromBackEnd], ...newProducts);
  };

  const HandleAddItemToCart = (productName) => {
    setCartNotifications(cartNotifications + 1);
    alert("Added " + productName + " to your cart!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <HomeContext.Provider
        value={{
          AddToCurrentlyDisplayedProducts,
        }}
      >
        <NavBar />
        <MainSales
          offers={[
            <ProductsOffer
              key={112}
              cat_id={GetFeaturedCategories()[0]}
              description="Discover unbeatable prices on top-quality computer components."
              title="Build your own PC!"
            />,
            <ProductsOffer
              key={113}
              cat_id={GetFeaturedCategories()[1]}
              title="Choose your laptop!"
              description="Pick a nice laptop!"
            />,
          ]}
        />
        <ProductsRow
          maxDisplayedItems={5}
          HandleAddItemToCart={HandleAddItemToCart}
          megacategoryID={popularCategoriesIDs[0]}
        />
        <ProductsRow
          maxDisplayedItems={5}
          HandleAddItemToCart={HandleAddItemToCart}
          megacategoryID={popularCategoriesIDs[1]}
        />
      </HomeContext.Provider>
    </div>
  );
};

export default Home;
