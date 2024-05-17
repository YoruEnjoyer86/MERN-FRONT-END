import React from "react";
import "./ShortFavoriteProductsList.css";
const ShortFavoriteProductsList = ({
  listDetails,
  isSelected,
  HandleClick,
}) => {
  return (
    <div
      className={
        "short_favorite_products_list " + (isSelected ? "selected" : "")
      }
      onClick={HandleClick}
    >
      <p className="list_name">{listDetails.name}</p>
      <p className="nr_products">{listDetails.nrProducts}</p>
    </div>
  );
};

export default ShortFavoriteProductsList;
