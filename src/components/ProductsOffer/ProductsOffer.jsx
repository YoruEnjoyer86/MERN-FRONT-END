import React, { useEffect, useState, useContext } from "react";
import "./ProductsOffer.css";
import ProductInOfferDisplay from "../ProductInOfferDisplay/ProductInOfferDisplay";
import axios from "axios";
import base_url from "../../base_url";
import { AppContext } from "../../Contexts/AppContext";

const ProductsOffer = ({
  cat_id,
  description = "",
  reverse_layout,
  title,
  type_of_display,
}) => {
  const [products, set_products] = useState([]);
  const { window_size } = useContext(AppContext);

  const GetMostSoldProducts = async () => {
    // console.log("CATIT", cat_id);
    let response = await axios.post(
      base_url + "/get_most_sold_products_from_category",
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
      {window_size.width >= 580 ? (
        <div className="content">
          <div className="description">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="products">
            {products
              .map((prod, index) => (
                <ProductInOfferDisplay
                  key={index}
                  product={prod}
                  className="product"
                />
              ))
              .filter((prod, index) => {
                if (window_size.width <= 750 && index > 0) return false;
                return true;
              })}
          </div>
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <div className="row">
            <div className="products">
              {products
                .map((prod, index) => (
                  <ProductInOfferDisplay
                    key={index}
                    product={prod}
                    className="product"
                  />
                ))
                .filter((prod, index) => {
                  if (window_size.width <= 750 && index > 0) return false;
                  return true;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsOffer;
