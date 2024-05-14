import React, { useEffect, useState } from "react";
import "./ProductShortDisplay.css";
import RatingStars from "../RatingStars/RatingStars.jsx";
import PriceRow from "../PriceRow/PriceRow.jsx";
import axios from "axios";

const favoriteImage = "../../public/favorites_hover.png";
const notFavoriteImage = "../../public/favorites.png";
const noImage = "../../public/no_image.png";

const ProductShortDisplay = ({ product, className, HandleAddItemToCart }) => {
  const [isFavorite, setFavorite] = useState(false); // TODO MOVE STATE UP
  const [imageSrc, setImageSrc] = useState(noImage);

  const RequestImageFromBackend = async () => {
    let response = await axios.post(
      "http://localhost:3001/api/get_product_image",
      {
        productDetails: JSON.stringify({
          name: product.name,
          seller: product.seller,
        }),
      }
    );
    if (response.data.ok != false) {
      console.log(response.data.img);
      setImageSrc(response.data.img);
    }
  };

  useEffect(() => {
    RequestImageFromBackend();
  }, []);

  return (
    <div className={"product_short_display " + className}>
      <div
        className="favorite_button"
        onClick={() => {
          setFavorite(!isFavorite);
        }}
      >
        <img
          className="favorite_button_image"
          src={isFavorite ? favoriteImage : notFavoriteImage}
        />
      </div>
      <img className="product_short_display_image" src={imageSrc} />
      <p className="product_short_display_text">{product.name}</p>
      <RatingStars
        className="margin_bottom"
        value={product.rating}
        nrReviews={product.num_reviews}
      />
      <PriceRow
        className="price_row_in_product"
        price={product.price}
        HandleAddItemToCart={() => {
          HandleAddItemToCart(product.name);
        }}
      />
    </div>
  );
};

export default ProductShortDisplay;
