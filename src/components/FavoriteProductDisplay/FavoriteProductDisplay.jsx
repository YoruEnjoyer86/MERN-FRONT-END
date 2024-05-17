import React, { useEffect, useState } from "react";
import "./FavoriteProductDisplay.css";
import axios from "axios";
import RatingStars from "../RatingStars/RatingStars";
import PriceRow from "../PriceRow/PriceRow.jsx";

const FavoriteProductDisplay = ({ product }) => {
  const [imageSrc, setImageSrc] = useState("");

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
    } else console.log(response.data.error);
  };

  useEffect(() => {
    RequestImageFromBackend();
  }, []);

  return (
    <div className="favorite_product">
      <img src={imageSrc} className="favorite_product_image"></img>
      <div className="name_and_reviews_column">
        <p className="">{product.name}</p>
        <RatingStars
          className="rating_row"
          value={product.rating}
          nrReviews={product.nrReviews}
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
          <p className="sold_by_text">Sold by</p>
          <p className="seller_text">{product.seller}</p>
          <div className="seller_rating_row">
            <p className="number_stars_text">{4.3}</p>
            <img className="seller_star" src="../../../public/full_star.png" />
          </div>
        </div>
        <PriceRow
          textClass="price_text"
          price={product.price}
          className="favorite_product_list_price_row"
        />
        <div className="remove_from_list_row">
          <p className="remove_item_text">Remove</p>
          <img className="trash_icon" src="../../../public/red_trash.png" />
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductDisplay;
