import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./home.css";
import ProductsRow from "../../components/ProductsRow/ProductsRow.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../../Contexts/HomeContext.js";

const GetProducts = () => {
  //TODO IA PRODUSE
  // asat sfjsilhfishfhsbfshfojshfhsjfwjefjer 0000000000000000000000000000000000000000000000000000000000
  //ana are mere
  //ana nu are mere e adhsahdashasd

  return products;
};

const Home = () => {
  const navigate = useNavigate();

  const AddProductToCart = async (productId) => {
    if ((await CheckUserConnected()) == false) {
      navigate("/register");
      return;
    }
    console.log("ADDING ITEM TO CART");
    let res = await axios.post(
      "http://localhost:3001/increase_product_quantity_in_cart",
      {
        id: productId,
      }
    );
    console.log(res.data);
  };

  let [productsFromBackEnd, setProductsFromBackEnd] = useState([]);
  let [productsFavoriteStatuses, setProductsFavoriteStatuses] = useState([]);

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    return res.data.ok;
  };

  useEffect(() => {
    //console.log(productsFavoriteStatuses);
  }, [productsFavoriteStatuses]);

  const GetProductsFromBackend = async () => {
    let res = await axios.post(
      "http://localhost:3001/api/get_products_of_category",
      {
        category: "everything",
      }
    );
    setProductsFromBackEnd(res.data);
  };

  const CheckIfProductFavorited = async (id, index) => {
    let res = await axios.post("http://localhost:3001/is_product_favorite", {
      id,
    });
    // console.log(
    //   productsFromBackEnd[index].name + " favorit : " + res.data.isFavorite
    // );
    if (res.data.ok) return res.data.isFavorite;
    return false;
  };

  const UpdateProductFavoriteStatuses = async () => {
    let newFavArray = [];
    for (let index = 0; index < productsFromBackEnd.length; index++)
      newFavArray.push({
        id: productsFromBackEnd[index]._id,
        value: await CheckIfProductFavorited(
          productsFromBackEnd[index]._id,
          index
        ),
      });
    setProductsFavoriteStatuses(newFavArray);
  };

  useEffect(() => {
    UpdateProductFavoriteStatuses();
  }, [productsFromBackEnd]);

  useEffect(() => {
    GetProductsFromBackend();
  }, []);

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
      <HomeContext.Provider
        value={{
          productsFavoriteStatuses,
          setProductsFavoriteStatuses,
          AddProductToCart,
        }}
      >
        {/* <ProductsRow
          maxDisplayedItems={5}
          products={productsFromBackEnd}
          category="Everything"
        /> */}
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
      </HomeContext.Provider>
    </div>
  );
};

export default Home;
