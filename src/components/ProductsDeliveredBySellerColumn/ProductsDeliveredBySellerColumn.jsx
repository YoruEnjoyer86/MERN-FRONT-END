import { React, useState, useEffect } from "react";
import "./ProductsDeliveredBySellerColumn.css";
import axios from "axios";

const noImageSrc = "../../../public/no_image.png";

const ProductsDeliveredBySellerColumn = ({ seller, products }) => {
  let productsCost = 0;
  let deliveryCost = 36.4;
  for (let i = 0; i < products.length; i++)
    productsCost += products[i].quantity > 0 ? products[i].price : 0;
  const [images, setImages] = useState([]);

  const GetProductImagesFromBackend = async () => {
    let newImages = [];
    for (let i = 0; i < products.length; i++) {
      let res = await axios.post(
        "http://localhost:3001/api/get_product_image",
        {
          productDetails: {
            name: products[i].name,
            seller: products[i].seller,
          },
        }
      );
      if (res.data.ok) newImages.push(res.data.img);
      else newImages.push(noImageSrc);
    }
    setImages(newImages);
  };

  useEffect(() => {
    setImages(products.map((product) => noImageSrc));
    GetProductImagesFromBackend();
  }, []);

  return (
    <div className="products_delivered_by_seller_column">
      <p className="seller_text">{"Products delivered by " + seller}</p>
      {products.map((product, index) => (
        <div className="product_row" key={index}>
          <img src={images[index]} className="product_image" />
          <div className="product_information_row">
            <div className="name_and_notifications_column">
              {product.quantity === 0 && (
                <div className="notification_row">
                  <img
                    src="../../../public/warning.png"
                    className="notification_image"
                  />
                  <p className="product_notification_text">
                    This product is no longer available.
                  </p>
                </div>
              )}
              <p className="product_name_text">{product.name}</p>
              <p className="sold_by_text">{"Sold by " + seller}</p>
            </div>
            <div className="product_options_column">
              {product.quantity > 0 && (
                <div className="product_price_quantity_column">
                  <p className="product_price_text">{product.price + " LEI"}</p>
                  <div className="modify_quantity_row">
                    <img
                      src="../../../public/minus.png"
                      className="plus_image"
                    />
                    <p className="product_quantity_text">1</p>
                    <img
                      src="../../../public/plus.png"
                      className="plus_image"
                    />
                  </div>
                </div>
              )}
              <p className="product_option_text">Move to favorites</p>
              <p className="product_option_text">Remove from cart</p>
            </div>
          </div>
        </div>
      ))}
      <div className="bottom_price_row">
        <div className="costs_column">
          <p className="price_row_text">
            {"Products cost: " + productsCost.toString()}
          </p>
          <p className="price_row_text">{"Delivery cost: " + deliveryCost}</p>
        </div>
        <div className="subtotal_row">
          <p className="subtotal_text">Subtotal:</p>
          <p className="subtotal_price_text">
            {(productsCost + deliveryCost).toString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsDeliveredBySellerColumn;
