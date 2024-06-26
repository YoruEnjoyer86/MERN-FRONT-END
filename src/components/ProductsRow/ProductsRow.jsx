import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ProductShortDisplay from "../ProductShortDisplay/ProductShortDisplay.jsx";
import "./ProductsRow.css";
import "../DotsRow/DotsRow.jsx";
import DotsRow from "../DotsRow/DotsRow.jsx";
import axios from "axios";
import { HomeContext } from "../../Contexts/HomeContext.js";
import { AppContext } from "../../Contexts/AppContext.js";
import { useNavigate } from "react-router-dom";
import base_url from "../../base_url.js";

const rigtArrowImg = "/arrow_rounded_right.svg";
const leftArrowImg = "/arrow_rounded_left.svg";

const ProductsRow = ({
  className,
  categoryID = -1,
  megacategoryID = -1,
  subcategoryID = -1,
}) => {
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [actualCategory, setActualCategory] = useState(undefined); // o sa fie ori category ori megacategory ori subcategory in functie de id-ul care nu e -1
  const navigate = useNavigate();
  const { set_search_data } = useContext(AppContext);
  const [screen_width, set_screen_width] = useState(window.innerWidth);
  const [maxDisplayedItems, set_maxDisplayedItems] = useState(5);
  let margin_between_products = 2;

  const FetchActualCategory = async () => {
    let axiosResult;
    if (subcategoryID != -1)
      axiosResult = await axios.post(
        base_url + "/get_category_of_any_type_by_id",
        {
          id: subcategoryID,
          categoryType: 0,
        }
      );
    else if (categoryID != -1)
      axiosResult = await axios.post(
        base_url + "/get_category_of_any_type_by_id",
        {
          id: categoryID,
          categoryType: 1,
        }
      );
    else
      axiosResult = await axios.post(
        base_url + "/get_category_of_any_type_by_id",
        {
          id: megacategoryID,
          categoryType: 2,
        }
      );
    setActualCategory(axiosResult.data.result);
  };

  const GetProductsFromBackend = async () => {
    let res = await axios.post(
      base_url + "/get_products_of_any_type_categoryID",
      {
        id: actualCategory._id,
        categoryType: subcategoryID != -1 ? 0 : categoryID != -1 ? 1 : 2,
      }
    );
    // console.log(res.data);
    setProducts(res.data.products);
    //AddToCurrentlyDisplayedProducts(res.data);
  };

  const OnWindowWidthChange = () => {
    set_screen_width(window.innerWidth);
    // console.log(window.innerWidth);
    if (window.innerWidth > 1600) set_maxDisplayedItems(5);
    else if (window.innerWidth > 1360) set_maxDisplayedItems(4);
    else if (window.innerWidth > 1000) set_maxDisplayedItems(3);
    else if (window.innerWidth > 600) set_maxDisplayedItems(2);
    else set_maxDisplayedItems(1);
  };

  useEffect(() => {
    FetchActualCategory();
    addEventListener("resize", OnWindowWidthChange);
    OnWindowWidthChange();
    return () => {
      removeEventListener("resize", OnWindowWidthChange);
    };
  }, []);

  useEffect(() => {
    //console.log(actualCategory);
    if (actualCategory != undefined) GetProductsFromBackend();
  }, [actualCategory]);

  const HandleOnRightArrowClick = () => {
    if (firstItemIndex + maxDisplayedItems < products.length)
      setFirstItemIndex(firstItemIndex + maxDisplayedItems);
  };

  const HandleOnLeftArrowClick = () => {
    if (firstItemIndex - maxDisplayedItems >= 0)
      setFirstItemIndex(firstItemIndex - maxDisplayedItems);
  };

  const HandleOnDotClick = (dotIndex) => {
    setFirstItemIndex(dotIndex * maxDisplayedItems);
  };

  const OnActualCategoryNameClick = async () => {
    let new_search_data = {};
    if (subcategoryID != -1) new_search_data.subcategory = actualCategory;
    else if (categoryID != -1) new_search_data.category = actualCategory;
    else new_search_data.mega_category = actualCategory;

    let res = await axios.post(base_url + "/process_search_data", {
      search_data: new_search_data,
    });
    localStorage.setItem("search_data", res.data);
    set_search_data(res.data);
    navigate("/search");
  };

  return (
    <div className="container">
      <p className="category_text" onClick={OnActualCategoryNameClick}>
        {actualCategory === undefined ? "loading..." : actualCategory.name}
      </p>
      <div className={"products_and_arrows_row " + className}>
        {firstItemIndex - maxDisplayedItems >= 0 && (
          <button className="left_arrow_button">
            <img
              className="left_button_arrow"
              src={leftArrowImg}
              onClick={HandleOnLeftArrowClick}
            />
          </button>
        )}
        <div className="products_row">
          {products.map(
            (product, index) =>
              index >= firstItemIndex &&
              index < firstItemIndex + maxDisplayedItems && (
                <ProductShortDisplay
                  className={
                    index === products.length - 1 ||
                    index % maxDisplayedItems === maxDisplayedItems - 1
                      ? "last_product_in_product_row"
                      : ""
                  }
                  product={product}
                  key={index}
                  style={{
                    width: `calc((100% - ${
                      (maxDisplayedItems - 1) * margin_between_products
                    }rem) / ${maxDisplayedItems})`,
                  }}
                />
              )
          )}
        </div>
        {firstItemIndex + maxDisplayedItems < products.length && (
          <button className="right_arrow_button">
            <img
              className="right_button_arrow"
              src={rigtArrowImg}
              onClick={HandleOnRightArrowClick}
            />
          </button>
        )}
      </div>
      {screen_width > 600 && (
        <DotsRow
          nrDots={Math.ceil(products.length / maxDisplayedItems)}
          currentDot={firstItemIndex / maxDisplayedItems}
          ChangeCurrentDot={HandleOnDotClick}
        />
      )}
    </div>
  );
};

export default ProductsRow;
