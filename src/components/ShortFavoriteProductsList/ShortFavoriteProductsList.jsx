import React, { useContext, useEffect } from "react";
import "./ShortFavoriteProductsList.css";
import { FavoritePageContext } from "../../Contexts/FavoritePageContext";
const ShortFavoriteProductsList = ({ isSelected, HandleClick, listIndex }) => {
  const { lists, currentListIndex, currentListProducts } =
    useContext(FavoritePageContext);

  return (
    <div
      className={
        "short_favorite_products_list " + (isSelected ? "selected" : "")
      }
      onClick={HandleClick}
    >
      <p className="list_name">{lists[listIndex].name}</p>
      <p className="nr_products">
        {listIndex == currentListIndex
          ? currentListProducts.length
          : lists[listIndex].products.length}
      </p>
    </div>
  );
};

export default ShortFavoriteProductsList;
