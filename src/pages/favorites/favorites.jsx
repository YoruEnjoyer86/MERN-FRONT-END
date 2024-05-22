import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./favorites.css";
import { useState } from "react";
import FavoriteProductListsRow from "../../components/FavoriteProductListsRow/FavoriteProductListsRow.jsx";
import RowWithItems from "../../components/RowWithItems/RowWithItems.jsx";
import ShortFavoriteProductsList from "../../components/ShortFavoriteProductsList/ShortFavoriteProductsList.jsx";
import SortedItemsColumn from "../../components/SortedItemsColumn/SortedItemsColumn.jsx";
import FavoritesListColumn from "../../components/FavoritesListColumn/FavoritesListColumn.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FavoritePageContext } from "../../Contexts/FavoritePageContext.js";

const favorites = () => {
  const navigate = useNavigate();
  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);
  const [listsReactItems, setListsReactItems] = useState([]);
  const [lists, setLists] = useState([]);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [currentListProducts, setCurrentListProducts] = useState([]);

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

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    //console.log("CONNECTED : " + res.data.ok);
    return res.data.ok;
  };

  const FavoritesInitialize = async () => {
    if ((await CheckUserConnected()) == true) {
      await GetListsFromBackend();
      GetProductsOfSelectedList();
    } else navigate("/register");
  };

  useEffect(() => {
    FavoritesInitialize();
  }, []);

  useEffect(() => {
    GetProductsOfSelectedList();
  }, [currentListIndex, lists]);

  const GetProductsOfSelectedList = async () => {
    // console.log(lists);
    if (lists[currentListIndex] != undefined) {
      let res = await axios.post(
        "http://localhost:3001/get_products_from_favorite_list",
        {
          name: lists[currentListIndex].name,
        }
      );
      if (res.data.ok) {
        // console.log("list products were found!");
        setCurrentListProducts(res.data.products);
      } else console.log(res.data.message);
    } else {
      // console.log("current list is undefined!");
    }
  };

  const GetListsFromBackend = async () => {
    let res = await axios.get("http://localhost:3001/get_favorite_lists");
    let listsDetails = res.data.lists;
    setLists(listsDetails);
    setListsReactItems(
      listsDetails.map((details, index) => (
        <ShortFavoriteProductsList
          isSelected={false}
          key={index}
          listIndex={index}
        />
      ))
    );
  };

  return (
    <FavoritePageContext.Provider
      value={{
        GetProductsOfSelectedList,
        currentListProducts: currentListProducts,
        lists,
        currentListIndex,
        AddProductToCart,
      }}
    >
      <div className="favorites_page">
        <NavBar
          className="no_margin"
          notifications={[
            profileNotifications,
            favoritesNotifications,
            cartNotifications,
          ]}
        />
        <div className="main_column">
          <div className="text_and_button_row">
            <p className="favorites_text">Favorites</p>
            <button className="new_list_button">New List</button>
          </div>
          <div className="favorite_lists_container_row">
            <RowWithItems
              maxDisplayedItems={8}
              category=""
              items={listsReactItems}
              highlightItemsOnClick={true}
            />
          </div>
          <SortedItemsColumn
            title={
              lists[currentListIndex] != undefined
                ? lists[currentListIndex].name
                : "missing_list_name"
            }
            details={
              lists[currentListIndex] != undefined
                ? lists[currentListIndex].products.length + " products"
                : "missing number of products"
            }
            buttonNames={["Modify"]}
          />
          <FavoritesListColumn />
        </div>
      </div>
    </FavoritePageContext.Provider>
  );
};

export default favorites;
