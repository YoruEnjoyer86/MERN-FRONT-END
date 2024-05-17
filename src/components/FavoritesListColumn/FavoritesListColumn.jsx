import React from "react";
import "./FavoritesListColumn.css";
import FavoriteProductDisplay from "../FavoriteProductDisplay/FavoriteProductDisplay";

const FavoritesListColumn = ({ products }) => {
  return (
    <div className="favorites_list">
      {products.map((product, index) => (
        <FavoriteProductDisplay product={product} key={index} />
      ))}
    </div>
  );
};

export default FavoritesListColumn;
