import React, { useContext, useEffect, useState } from "react";
import "./FavoriteProductDisplay.css";
import axios from "axios";
import RatingStars from "../RatingStars/RatingStars";
import PriceRow from "../PriceRow/PriceRow.jsx";
import { FavoritePageContext } from "../../Contexts/FavoritePageContext.js";
import { AppContext } from "../../Contexts/AppContext.js";
import { useNavigate } from "react-router-dom";
import base_url from "../../base_url.js";

// const full_star_image = (
//   await axios.post(base_url + "/get_image", {
//     img_name: "full_star.png",
//   })
// ).data.img;

// const red_trashcan_image = (
//   await axios.post(base_url + "/get_image", {
//     img_name: "red_trash.png",
//   })
// ).data.img;

const FavoriteProductDisplay = ({ product }) => {
  const { GetProductsOfSelectedList, currentListProducts } =
    useContext(FavoritePageContext);
  const navigate = useNavigate();
  const { set_product_page_product_id } = useContext(AppContext);

  const [imageSrc, setImageSrc] = useState("");
  const [seller_object, set_seller_object] = useState(undefined);

  const RemoveFromFavorites = async () => {
    let res = await axios.post(base_url + "/remove_product_from_favorites", {
      id: product._id,
    });
    // console.log(res.data);
    GetProductsOfSelectedList();
  };
  const RequestImageFromBackend = async () => {
    // console.log("IMAGE CHANGED!");
    let response = await axios.post(base_url + "/api/get_product_image", {
      product_id: product._id,
    });
    if (response.status === 200) {
      // console.log(response.data.img);
      setImageSrc(response.data.img);
    } else console.log(response.data.message);
  };

  useEffect(() => {
    RequestImageFromBackend();
  }, [currentListProducts]);

  const GoToProductPage = () => {
    set_product_page_product_id(product._id);
    navigate("/product");
  };

  const GetSellerObject = async () => {
    let res = await axios.post(base_url + "/fetch_user_by_id", {
      id: product.seller,
    });
    if (res.status === 200) set_seller_object(res.data);
    else console.log(res.data.message);
  };

  useEffect(() => {
    GetSellerObject();
  }, []);

  return (
    <div className="favorite_product">
      <img
        src={imageSrc}
        className="favorite_product_image"
        onClick={GoToProductPage}
      ></img>
      <div className="name_and_reviews_column">
        <p className="product_name_favorite_product">{product.name}</p>
        <RatingStars
          className="rating_row"
          value={product.rating}
          nrReviews={product.reviews.length}
        />
      </div>
      <div className="purchase_details_column">
        <p
          className={
            product.quantity > 0 ? "in_stock_text" : "out_of_stock_text"
          }
        >
          {product.quantity > 0 ? "In stock" : "Out of stock"}
        </p>
        <div className="seller_text_row">
          <p className="sold_by_text_favorite_product">Sold by</p>
          <p className="seller_text_favorite_product">
            {seller_object != undefined ? seller_object.name : ""}
          </p>
          <div className="seller_rating_row">
            <p className="number_stars_text">{4.3}</p>
            <img className="seller_star" src={"full_star_image"} />
          </div>
        </div>
        <PriceRow
          textClass="favorite_product_price_text"
          price={product.price}
          className="favorite_product_list_price_row"
          productId={product._id}
        />
        <div className="remove_from_list_row" onClick={RemoveFromFavorites}>
          <p className="remove_item_text">Remove</p>
          <img className="trash_icon" src={"red_trashcan_image"} />
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductDisplay;
