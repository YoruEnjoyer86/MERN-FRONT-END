import { React, useState, useEffect } from "react";
import "./ProductsDeliveredBySellerColumn.css";
import axios from "axios";

const noImageSrc = "../../../public/no_image.png";

const ProductsDeliveredBySellerColumn = ({
  seller,
  sellerIndex,
  products,
  sellerProductsQuantity,
  setSellerProductsQuantity,
  priceWithoutDelivery,
  fetchProductsFromBackend,
}) => {
  let productsCost = 0;
  let deliveryCost = 0;
  const [images, setImages] = useState([]);

  const OnRemoveFromCart = async (prodIndex) => {
    let res = await axios.post(
      "http://localhost:3001/remove_product_from_cart",
      {
        id: products[prodIndex]._id,
      }
    );
    fetchProductsFromBackend();
    // console.log(res);
  };

  const OnPlusClick = async (prodIndex) => {
    let res = await axios.post(
      "http://localhost:3001/increase_product_quantity_in_cart",
      {
        id: products[prodIndex]._id,
      }
    );
    let newProductsQuantities = sellerProductsQuantity[sellerIndex];
    newProductsQuantities[prodIndex] += 1;
    setSellerProductsQuantity(
      sellerProductsQuantity.map((quantities, index) =>
        index == sellerIndex ? newProductsQuantities : quantities
      )
    );
  };

  const OnMinusClick = async (prodIndex) => {
    //console.log(products[prodIndex]);
    let res = await axios.post(
      "http://localhost:3001/decrese_quantity_product_from_cart",
      {
        id: products[prodIndex]._id,
      }
    );

    let newProductsQuantities = sellerProductsQuantity[sellerIndex];
    newProductsQuantities[prodIndex] -= 1;
    if (newProductsQuantities[prodIndex] <= 0) {
      newProductsQuantities[prodIndex] = 0;
      fetchProductsFromBackend();
    }
    setSellerProductsQuantity(
      sellerProductsQuantity.map((quantities, index) =>
        index == sellerIndex ? newProductsQuantities : quantities
      )
    );
  };

  const CalcPriceOfSellerItemsWithoutDelivery = () => {
    if (sellerProductsQuantity.length == 0) return 0;
    let price = 0;
    for (let i = 0; i < products.length; i++)
      price +=
        products[i].quantity > 0
          ? products[i].price * sellerProductsQuantity[sellerIndex][i]
          : 0;
    return price;
  };

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
    // console.log(sellerIndex);
  }, []);

  return (
    <div className="products_delivered_by_seller_column">
      <p className="seller_text_product_in_cart">
        {"Products delivered by "}
        <span className="seller_name_shopping_cart_page">{seller}</span>
      </p>
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
              <p className="sold_by_text">
                {"Sold by "}{" "}
                <span className="seller_text_small_prod_delivered_by_seller">
                  {seller}
                </span>
              </p>
            </div>
            <div className="product_options_column">
              {product.quantity > 0 && (
                <div className="product_price_quantity_column">
                  <p className="product_price_text_in_cart">
                    {product.price + " $"}
                  </p>
                  <div className="modify_quantity_row">
                    <img
                      src="../../../public/minus.png"
                      className="plus_image"
                      onMouseUp={() => {
                        OnMinusClick(index);
                        // console.log("CALLING PLUS!");
                      }}
                    />
                    <p className="product_quantity_text">
                      {sellerProductsQuantity[sellerIndex] != undefined &&
                        sellerProductsQuantity[sellerIndex][index]}
                    </p>
                    <img
                      src="../../../public/plus.png"
                      className="plus_image"
                      onMouseUp={() => OnPlusClick(index)}
                    />
                  </div>
                </div>
              )}
              <p className="product_option_text">Move to favorites</p>
              <p
                className="product_option_text"
                onClick={() => {
                  OnRemoveFromCart(index);
                }}
              >
                Remove from cart
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="bottom_price_row">
        <div className="costs_column">
          <p className="price_row_text">
            {"Products cost: "}
            <span className="cost_text_small_in_cart">
              {CalcPriceOfSellerItemsWithoutDelivery().toString()}
              <span className="dollar_sign_small">$</span>
            </span>
          </p>
          <p className="price_row_text">
            {"Delivery cost: "}
            <span className="cost_text_small_in_cart">
              {deliveryCost}
              <span className="dollar_sign_small">$</span>
            </span>
          </p>
        </div>
        <div className="subtotal_row">
          <p className="price_row_text">
            {"Subtotal: "}
            <span className="cost_text_small_in_cart">
              {(
                CalcPriceOfSellerItemsWithoutDelivery() + deliveryCost
              ).toString()}
              <span className="dollar_sign_small">$</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsDeliveredBySellerColumn;
