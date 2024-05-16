import React, { useEffect } from "react";
import { useState } from "react";
import ProductShortDisplay from "../ProductShortDisplay/ProductShortDisplay.jsx";
import "./ProductsRow.css";
import "../DotsRow/DotsRow.jsx";
import DotsRow from "../DotsRow/DotsRow.jsx";
import axios from "axios";

const rigtArrowImg = "../../public/right_arrow.png";
const leftArrowImg = "../../public/left_arrow.png";

const ProductsRow = ({
  className,
  HandleAddItemToCart,
  maxDisplayedItems,
  category,
}) => {
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const GetProductsFromBackend = async () => {
    let res = await axios.post(
      "http://localhost:3001/api/get_products_of_category",
      {
        category: category.toLowerCase(),
      }
    );
    console.log(res);
    setProducts(res.data);
  };

  useEffect(() => {
    GetProductsFromBackend();
  }, []);

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
      <p className="category_text">{category}</p>
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
                  key={product.name}
                  HandleAddItemToCart={HandleAddItemToCart}
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
