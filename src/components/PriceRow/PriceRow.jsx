import React, { useContext } from "react";
import "./PriceRow.css";
import { AppContext } from "../../Contexts/AppContext";
const addToCartImage = "../../public/shopping_cart.png";

const PriceRow = ({ className, price, textClass, productId, context }) => {
  const { AddProductToCart } = useContext(AppContext);

  // console.log(useContext(HomeContext));

  return (
    <div className={"price_row " + className}>
      <p className={"price_text " + textClass}>{price + " $"}</p>
      <div
        className="cart_image_container"
        onClick={(event) => {
          event.stopPropagation();
          AddProductToCart(productId);
        }}
      >
        <img className="cart_image" src={addToCartImage} />
      </div>
    </div>
  );
};

export default PriceRow;
