import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductInOfferDisplay.css";
import axios from "axios";
import { AppContext } from "../../Contexts/AppContext";

const loading_img = "../../../public/no_image.png";

const ProductInOfferDisplay = ({ product, className }) => {
  const navigate = useNavigate();
  const [image, set_image] = useState(loading_img);
  const { set_product_page_product_id } = useContext(AppContext);

  let FetchProductImage = async () => {
    let response = await axios.post(
      "http://localhost:3001/api/get_product_image",
      {
        product_id: product._id,
      }
    );
    set_image(response.data.img);
  };

  let GoToProductPage = async () => {
    await axios.post("http://localhost:3001/set_product_page_product_id", {
      id: product._id,
    });
    set_product_page_product_id(product._id);
    navigate("/product");
  };

  useEffect(() => {
    FetchProductImage();
    // console.log(product.name);
  }, []);

  return (
    <div
      className={className + " product_in_offer_display"}
      onClick={GoToProductPage}
    >
      <div className="name_container">
        <p className="name">{product.name}</p>
      </div>
      <img src={image} className="image" />
    </div>
  );
};

export default ProductInOfferDisplay;
