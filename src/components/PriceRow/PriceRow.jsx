import React, { useContext } from "react";
import "./PriceRow.css";
import { HomeContext } from "../../Contexts/HomeContext";
import { FavoritePageContext } from "../../Contexts/FavoritePageContext";

const addToCartImage = "../../public/shopping_cart.png";

const PriceRow = ({ className, price, textClass, productId, context }) => {
  const currentContext = useContext(HomeContext)
    ? useContext(HomeContext)
    : useContext(FavoritePageContext);
  const { AddProductToCart } = currentContext;

  // console.log(useContext(HomeContext));

  return (
    <div className={"price_row " + className}>
      <p className={"price_text " + textClass}>{price + " $"}</p>
      <div
        className="cart_image_container"
        onClick={() => {
          AddProductToCart(productId);
        }}
      >
        <img className="cart_image" src={addToCartImage} />
      </div>
    </div>
  );
};

export default PriceRow;
