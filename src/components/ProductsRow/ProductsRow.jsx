import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ProductShortDisplay from "../ProductShortDisplay/ProductShortDisplay.jsx";
import "./ProductsRow.css";
import "../DotsRow/DotsRow.jsx";
import DotsRow from "../DotsRow/DotsRow.jsx";
import axios from "axios";
import { HomeContext } from "../../Contexts/HomeContext.js";

const rigtArrowImg = "../../public/right_arrow.png";
const leftArrowImg = "../../public/left_arrow.png";

const ProductsRow = ({
  className,
  maxDisplayedItems,
  categoryID = -1,
  megacategoryID = -1,
  subcategoryID = -1,
}) => {
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [actualCategory, setActualCategory] = useState({}); // o sa fie ori category ori megacategory ori subcategory in functie de id-ul care nu e -1
  const { AddToCurrentlyDisplayedProducts } = useContext(HomeContext);

  const FetchActualCategory = async () => {
    let axiosResult;
    if (subcategoryID != -1)
      axiosResult = await axios.post(
        "http://localhost:3001/get_category_of_any_type_by_id",
        {
          id: subcategoryID,
          categoryType: 0,
        }
      );
    else if (categoryID != -1)
      axiosResult = await axios.post(
        "http://localhost:3001/get_category_of_any_type_by_id",
        {
          id: categoryID,
          categoryType: 1,
        }
      );
    else
      axiosResult = await axios.post(
        "http://localhost:3001/get_category_of_any_type_by_id",
        {
          id: megacategoryID,
          categoryType: 2,
        }
      );
    setActualCategory(axiosResult.data.result);
  };

  const GetProductsFromBackend = async () => {
    let res = await axios.post(
      "http://localhost:3001/get_products_of_any_type_categoryID",
      {
        id: actualCategory._id,
        categoryType: subcategoryID != -1 ? 0 : categoryID != -1 ? 1 : 2,
      }
    );
    // console.log(res.data);
    setProducts(res.data.products);
    //AddToCurrentlyDisplayedProducts(res.data);
  };

  useEffect(() => {
    FetchActualCategory();
  }, []);

  useEffect(() => {
    //console.log(actualCategory);
    GetProductsFromBackend();
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

  const HandleOnCategoryClick = () => {
    //TODO CAUTA CATEGORIA CATEGORY
  };

  return (
    <div className="container">
      <p className="category_text">{actualCategory.name}</p>
      <div className={"products_and_arrows_row " + className}>
        {firstItemIndex - maxDisplayedItems >= 0 && (
          <img
            className="prev_products_arrow"
            src={leftArrowImg}
            onClick={HandleOnLeftArrowClick}
          />
        )}
        <div className="products_row">
          {products.map(
            (product, index) =>
              index >= firstItemIndex &&
              index < firstItemIndex + maxDisplayedItems && (
                <ProductShortDisplay
                  className=""
                  product={product}
                  key={index}
                />
              )
          )}
        </div>
        {firstItemIndex + maxDisplayedItems < products.length && (
          <img
            className="next_products_arrow"
            src={rigtArrowImg}
            onClick={HandleOnRightArrowClick}
          />
        )}
      </div>
      <DotsRow
        nrDots={Math.ceil(products.length / maxDisplayedItems)}
        currentDot={firstItemIndex / maxDisplayedItems}
        ChangeCurrentDot={HandleOnDotClick}
      />
    </div>
  );
};

export default ProductsRow;
