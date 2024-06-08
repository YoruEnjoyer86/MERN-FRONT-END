import React, { useEffect, useState } from "react";
import "./ProductsOffer.css";
import ProductInOfferDisplay from "../ProductInOfferDisplay/ProductInOfferDisplay";
import axios from "axios";

const ProductsOffer = ({
  cat_id,
  description = "",
  reverse_layout,
  title,
  type_of_display,
}) => {
  const [products, set_products] = useState([]);

  const GetMostSoldProducts = async () => {
    // console.log("CATIT", cat_id);
    let response = await axios.post(
      "http://localhost:3001/get_most_sold_products_from_category",
      {
        cat_id,
      }
    );
    set_products(response.data);
  };

  useEffect(() => {
    GetMostSoldProducts();
  }, []);

  return (
    <div className="products_offer">
      <div className="content">
        <div className="description">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="products">
          {products.map((prod, index) => (
            <ProductInOfferDisplay
              key={index}
              product={prod}
              className="product"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsOffer;
