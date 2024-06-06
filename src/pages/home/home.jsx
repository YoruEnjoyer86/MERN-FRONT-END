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

const GetProducts = () => {
  //TODO IA PRODUSE
  // asat sfjsilhfishfhsbfshfojshfhsjfwjefjer 0000000000000000000000000000000000000000000000000000000000
  //ana are mere
  //ana nu are mere e adhsahdashasd

  return products;
};

const Home = () => {
  const navigate = useNavigate();
  let [productsFromBackEnd, setProductsFromBackEnd] = useState([]);
  // let [productsFavoriteStatuses, setProductsFavoriteStatuses] = useState([]);
  const popularCategoriesIDs = [
    "665064a513faede67f9ef7c3",
    "665064c313faede67f9ef7c4",
  ];

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    return res.data.ok;
  };

  const AddToCurrentlyDisplayedProducts = async (newProducts) => {
    setProductsFromBackEnd([...productsFromBackEnd], ...newProducts);
  };

  // const CheckIfProductFavorited = async (id, index) => {
  //   let res = await axios.post("http://localhost:3001/is_product_favorite", {
  //     id,
  //   });
  //   if (res.data.ok) return res.data.isFavorite;
  //   return false;
  // };

  // const UpdateProductFavoriteStatuses = async () => {
  //   let newFavArray = [];
  //   for (let index = 0; index < productsFromBackEnd.length; index++)
  //     newFavArray.push({
  //       id: productsFromBackEnd[index]._id,
  //       value: await CheckIfProductFavorited(
  //         productsFromBackEnd[index]._id,
  //         index
  //       ),
  //     });
  //   setProductsFavoriteStatuses(newFavArray);
  // };

  const HandleAddItemToCart = (productName) => {
    setCartNotifications(cartNotifications + 1);
    alert("Added " + productName + " to your cart!");
  };

  // useEffect(() => {
  //   UpdateProductFavoriteStatuses();
  // }, [productsFromBackEnd]);

  // useEffect(() => {
  //   //console.log(productsFavoriteStatuses);
  // }, [productsFavoriteStatuses]);

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
            <ProductsOffer title="Fashion" />,
            <ProductsOffer title="Create your own computer!" />,
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
