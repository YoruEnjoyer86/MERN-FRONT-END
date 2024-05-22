import React, { useContext } from "react";
import "./FavoritesListColumn.css";
import FavoriteProductDisplay from "../FavoriteProductDisplay/FavoriteProductDisplay";
import { FavoritePageContext } from "../../Contexts/FavoritePageContext";

const FavoritesListColumn = () => {
  const { currentListProducts } = useContext(FavoritePageContext);

  return (
    <div className="favorites_list">
      {currentListProducts.map((product, index) => (
        <FavoriteProductDisplay product={product} key={index} />
      ))}
    </div>
  );
};

export default FavoritesListColumn;
