import React, { useContext, useEffect, useState } from "react";
import "./FavoriteProductDisplay.css";
import axios from "axios";
import RatingStars from "../RatingStars/RatingStars";
import PriceRow from "../PriceRow/PriceRow.jsx";
import { FavoritePageContext } from "../../Contexts/FavoritePageContext.js";
import { AppContext } from "../../Contexts/AppContext.js";
import { useNavigate } from "react-router-dom";

const FavoriteProductDisplay = ({ product }) => {
  const { GetProductsOfSelectedList, currentListProducts } =
    useContext(FavoritePageContext);
  const navigate = useNavigate();
  const { set_product_page_product_id } = useContext(AppContext);

  const [imageSrc, setImageSrc] = useState("");

  const RemoveFromFavorites = async () => {
    let res = await axios.post(
      "http://localhost:3001/remove_product_from_favorites",
      {
        id: product._id,
      }
    );
    // console.log(res.data);
    GetProductsOfSelectedList();
  };
  const RequestImageFromBackend = async () => {
    console.log("IMAGE CHANGED!");
    let response = await axios.post(
      "http://localhost:3001/api/get_product_image",
      {
        productDetails: {
          name: product.name,
          seller: product.seller,
        },
      }
    );
    if (response.data.ok) {
      // console.log(response.data.img);
      setImageSrc(response.data.img);
    } else console.log(response.data.error);
  };

  useEffect(() => {
    RequestImageFromBackend();
  }, [currentListProducts]);

  const GoToProductPage = () => {
    set_product_page_product_id(product._id);
    navigate("/product");
  };

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
          <p className="seller_text_favorite_product">{product.seller}</p>
          <div className="seller_rating_row">
            <p className="number_stars_text">{4.3}</p>
            <img className="seller_star" src="../../../public/full_star.png" />
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
          <img className="trash_icon" src="../../../public/red_trash.png" />
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductDisplay;
