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

const favorites = () => {
  const navigate = useNavigate();
  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);
  const [lists, setLists] = useState([]);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [currentListProducts, setCurrentListProducts] = useState([]);

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    console.log("CONNECTED : " + res.data.ok);
    return res.data.ok;
  };

  const FavoritesInitialize = async () => {
    if ((await CheckUserConnected()) == true) {
      GetListsFromBackend();
      GetProductsOfSelectedList();
    } else navigate("/register");
  };

  useEffect(() => {
    FavoritesInitialize();
  }, []);

  useEffect(() => {
    GetProductsOfSelectedList();
  }, [currentListIndex]);

  const GetProductsOfSelectedList = async () => {
    //REQUEST TO GET PRODUCTS FROM CURRENT LIST
    let res = await axios.post(
      "http://localhost:3001/api/get_products_of_category",
      {
        category: "everything",
      }
    );
    setCurrentListProducts(res.data);
  };

  const GetListsFromBackend = async () => {
    let listsDetails = [
      {
        name: "Every Favorite",
        nrProducts: 10,
      },
      {
        name: "Awesome List",
        nrProducts: 420,
      },
      {
        name: "Three",
        nrProducts: 10,
      },
      {
        name: "Four",
        nrProducts: 420,
      },
      {
        name: "Five",
        nrProducts: 10,
      },
      {
        name: "Six",
        nrProducts: 420,
      },
      {
        name: "Seven",
        nrProducts: 10,
      },
      {
        name: "Eight",
        nrProducts: 420,
      },
      {
        name: "Nine",
        nrProducts: 10,
      },
      {
        name: "Ten",
        nrProducts: 420,
      },
    ];

    setLists(
      listsDetails.map((details, index) => (
        <ShortFavoriteProductsList
          listDetails={details}
          isSelected={false}
          key={index}
        />
      ))
    );
    //REQUEST LISTS FROM BACKEND
    let res = await axios.post(
      "http://localhost:3001/api/get_products_of_category",
      {
        category: "",
      }
    );
    setCurrentListProducts(res.data);
  };

  return (
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
          <p>Favorites</p>
          <button className="new_list_button">New List</button>
        </div>
        <div className="favorite_lists_container_row">
          <RowWithItems
            maxDisplayedItems={8}
            category=""
            items={lists}
            highlightItemsOnClick={true}
          />
        </div>
        <SortedItemsColumn
          title="BRUH"
          details="10 products"
          buttonNames={["help", "me"]}
        />
        <FavoritesListColumn products={currentListProducts} />
      </div>
    </div>
  );
};

export default favorites;
