import React, { useContext, useEffect, useState } from "react";
import "./product_page.css";
import NavBar from "../../components/NavBar/NavBar";
import { AppContext } from "../../Contexts/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const { product_page_product_id, AddProductToCart, CheckUserConnected } =
    useContext(AppContext);
  const [product, setProduct] = useState({
    name: "",
  });

  useEffect(() => {
    FetchProduct();
  }, [product_page_product_id]);

  const [prod_image_src, set_prod_image_src] = useState(
    "../../public/no_image.png"
  );

  const FetchProduct = async () => {
    if (product_page_product_id == undefined) return;
    let prod = await axios.post("http://localhost:3001/get_product_with_id", {
      id: product_page_product_id,
    });
    let productDetails = {
      name: prod.data.name,
      seller: prod.data.seller,
    };
    let res = await axios.post("http://localhost:3001/api/get_product_image", {
      product_id: product_page_product_id,
    });
    if (res.status === 200) set_prod_image_src(res.data.img);
    else
      console.log(
        "eroare la get_image_from_database pt produs : " + prod.data.name
      );
    // console.log(productDetails);
    setProduct(prod.data);
  };

  const TryAddProductToCart = async (product) => {
    if ((await CheckUserConnected()) == false) {
      navigate("/register");
      return;
    }
    AddProductToCart(product._id);
    navigate("/product");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product_page">
      <NavBar />
      <div className="container_product_page">
        <div className="product-details_product_page">
          <div className="product-info_product_page">
            <h1>{product.name}</h1>
            <img
              className="product_image_product_page"
              src={prod_image_src}
              alt="Poza"
            />
            <p className="product_details_text_product_page">
              <strong>Price:</strong>{" "}
              <span className="price_span_product_page">{product.price}</span>
              <span className="dollar_sign_span_product_page">$</span>
            </p>
            <p className="product_details_text_product_page">
              {product.description}
            </p>
            <button
              className="add_to_cart_button_product_page"
              onClick={() => {
                TryAddProductToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="reviews_product_page">
          <h2>Reviews</h2>
          <div className="review_product_page">
            <p>
              <strong className="user_name_text_from_review_product_page">
                Marcel
              </strong>
            </p>
            <p>Bun</p>
          </div>
          <div className="review_product_page">
            <p>
              <strong className="user_name_text_from_review_product_page">
                Petrica
              </strong>
            </p>
            <p>Fain</p>
          </div>
        </div>
        <div className="review-form_product_page">
          <h2>Write a Review</h2>
          <form>
            <textarea
              name="reviewText"
              rows="4"
              placeholder="Your Review"
              required
            ></textarea>
            <button className="submit_review_button">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
