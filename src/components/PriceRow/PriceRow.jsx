import React, { useContext } from "react";
import "./PriceRow.css";
import { AppContext } from "../../Contexts/AppContext";
import { useNavigate } from "react-router-dom";
const addToCartImage = "../../public/shopping_cart.png";

const PriceRow = ({ className, price, textClass, productId, context }) => {
  const { AddProductToCart, CheckUserConnected } = useContext(AppContext);
  const navigate = useNavigate();

  // console.log(useContext(HomeContext));

  return (
    <div className={"price_row " + className}>
      <p className={"price_text " + textClass}>{price + " $"}</p>
      <div
        className="cart_image_container"
        onClick={async (event) => {
          event.stopPropagation();
          if (await CheckUserConnected()) AddProductToCart(productId);
          else navigate("/register");
        }}
      >
        <img className="cart_image" src={addToCartImage} />
      </div>
    </div>
  );
};

export default PriceRow;
