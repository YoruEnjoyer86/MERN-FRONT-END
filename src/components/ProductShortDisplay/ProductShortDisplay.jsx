import React, { useContext, useEffect, useState } from "react";
import "./ProductShortDisplay.css";
import RatingStars from "../RatingStars/RatingStars.jsx";
import PriceRow from "../PriceRow/PriceRow.jsx";
import axios from "axios";
import { HomeContext } from "../../Contexts/HomeContext.js";

const favoriteImage = "../../public/favorites_hover.png";
const notFavoriteImage = "../../public/favorites.png";
const noImage = "../../public/no_image.png";

const ProductShortDisplay = ({ product, className, HandleAddItemToCart }) => {
  const [imageSrc, setImageSrc] = useState(noImage);
  const [isFavorite, setFavorite] = useState(false);
  const { productsFavoriteStatuses, setProductsFavoriteStatuses } =
    useContext(HomeContext);

  useEffect(() => {
    for (let i = 0; i < productsFavoriteStatuses.length; i++) {
      let prod = productsFavoriteStatuses[i];
      if (prod.id == product._id) {
        setFavorite(prod.value);
        return;
      }
    }
  }, [productsFavoriteStatuses]);

  const OnInitialize = async () => {
    if ((await CheckUserConnected()) == true) {
    } else console.log("user not connected");

    RequestImageFromBackend();
  };

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    return res.data.ok;
  };

  const RequestImageFromBackend = async () => {
    let response = await axios.post(
      "http://localhost:3001/api/get_product_image",
      {
        productDetails: {
          name: product.name,
          seller: product.seller,
        },
      }
    );
    if (response.data.ok != false) {
      //console.log(response.data.img);
      setImageSrc(response.data.img);
    } else console.log(response.data.error);
  };

  const HandleFavoriteButtonClick = async () => {
    if (isFavorite) {
      let res = await axios.post(
        "http://localhost:3001/remove_product_from_favorites",
        {
          id: product._id,
        }
      );
      if (res.data.ok) console.log("product removed from favorites!");
      else
        console.log(
          "Error at removing product to favorites : " + res.data.message
        );
    } else {
      let res = await axios.post(
        "http://localhost:3001/add_product_to_favorites",
        {
          id: product._id,
        }
      );
      if (res.data.ok) console.log("product added to favorites!");
      else
        console.log(
          "Error at adding product to favorites : " + res.data.message
        );
    }
    let indexToChange = 0;
    for (let i = 0; i < productsFavoriteStatuses.length; i++) {
      let prod = productsFavoriteStatuses[i];
      if (prod.id == product._id) {
        indexToChange = i;
        break;
      }
    }
    setProductsFavoriteStatuses(
      productsFavoriteStatuses.map((prod, index) =>
        index == indexToChange ? { id: prod.id, value: !prod.value } : prod
      )
    );
    console.log(newFavStatuses);
  };

  useEffect(() => {
    OnInitialize();
  }, []);

  return (
    <div className={"product_short_display " + className}>
      <div className="favorite_button" onClick={HandleFavoriteButtonClick}>
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
