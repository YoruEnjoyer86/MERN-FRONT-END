import React, { useContext, useEffect, useState, useRef } from "react";
import "./ProductShortDisplay.css";
import RatingStars from "../RatingStars/RatingStars.jsx";
import PriceRow from "../PriceRow/PriceRow.jsx";
import axios from "axios";
import { AppContext } from "../../Contexts/AppContext.js";
import { useNavigate } from "react-router-dom";
import base_url from "../../base_url.js";

const favoriteImage = "/favorites_black_heart.png";
const notFavoriteImage = "/favorites.png";
const noImage = "/no_image.png";

const ProductShortDisplay = ({ product, className, style }) => {
  const [imageSrc, setImageSrc] = useState(noImage);
  const [isFavorite, setFavorite] = useState();
  const navigate = useNavigate();
  const { set_product_page_product_id } = useContext(AppContext);
  const self_reference = useRef(null);

  const FetchIsFavorite = async () => {
    let token = localStorage.getItem("access_token");
    let res = await axios.post(
      base_url + "/is_product_favorite",
      {
        id: product._id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.status === 200) setFavorite(res.data.isFavorite);
    // console.log(res.data.isFavorite);
  };

  const OnInitialize = async () => {
    if ((await CheckUserConnected()) == true) {
      FetchIsFavorite();
    }
    // } else console.log("user not connected");

    RequestImageFromBackend();
  };

  const CheckUserConnected = async () => {
    let token = localStorage.getItem("access_token");
    let res = await axios.get(base_url + "/check_connected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data.ok;
  };

  const RequestImageFromBackend = async () => {
    let response = await axios.post(
      base_url + "/api/get_product_image",
      {
        product_id: product._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) setImageSrc(response.data.img);
    else console.log(response.data.message);
  };

  const HandleFavoriteButtonClick = async () => {
    if (isFavorite) {
      let token = localStorage.getItem("access_token");
      let res = await axios.post(
        base_url + "/remove_product_from_favorites",
        {
          id: product._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data.ok) console.log("product removed from favorites!");
      else
        console.log(
          "Error at removing product to favorites : " + res.data.message
        );
    } else {
      let token = localStorage.getItem("access_token");
      let res = await axios.post(
        base_url + "/add_product_to_favorites",
        {
          id: product._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data.ok) {
        console.log("product added to favorites!");
      } else
        console.log(
          "Error at adding product to favorites : " + res.data.message
        );
    }
    setFavorite(!isFavorite);
  };

  useEffect(() => {
    OnInitialize();
  }, [product]);

  const OnProductClick = async () => {
    localStorage.setItem("product_page_product_id", product._id);
    set_product_page_product_id(product._id);
    navigate("/product");
  };

  return (
    <div
      style={style}
      className={"product_short_display " + className}
      onClick={OnProductClick}
      ref={self_reference}
    >
      <div
        className="favorite_button"
        onClick={(event) => {
          event.stopPropagation();
          HandleFavoriteButtonClick();
        }}
      >
        <div className="heart_icon_container">
          <img
            className="favorite_button_image"
            src={isFavorite ? favoriteImage : notFavoriteImage}
          />
        </div>
      </div>
      <img className="product_short_display_image" src={imageSrc} />
      <div className="name_container">
        <p className="product_short_display_text">{product.name}</p>
      </div>
      <RatingStars
        className="margin_bottom"
        value={product.rating}
        nrReviews={product.num_reviews}
      />

      <PriceRow
        className="price_row_in_product"
        price={product.price}
        productId={product._id}
      />
    </div>
  );
};

export default ProductShortDisplay;
