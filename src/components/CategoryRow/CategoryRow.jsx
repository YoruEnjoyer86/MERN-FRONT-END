import React, { useState } from "react";
import "./CategoryRow.css";
import SubcategoryColumn from "../SubcategoryColumn/SubcategoryColumn";

const CategoryRow = ({ image, name, subcategories }) => {
  const [areSubcategoriesOpen, setSubcategoriesOpen] = useState(false);

  const HandleMouseEnter = () => {
    setSubcategoriesOpen(true);
  };

  const HandleMouseLeave = () => {
    setSubcategoriesOpen(false);
  };

  let subCategoryPairs = [];
  for (let i = 0; i < subcategories.length; i++)
    if (i % 2 == 0) {
      subCategoryPairs[Math.floor(i / 2)] = [subcategories[i]];
    } else subCategoryPairs[Math.floor(i / 2)].push(subcategories[i]);

  // console.log(subCategoryPairs);

  return (
    <div
      className="category_and_subcategories"
      onMouseEnter={HandleMouseEnter}
      onMouseLeave={HandleMouseLeave}
      onClick
    >
      <div className="category_row_container">
        <img className="category_row_image" src={image} />
        <p className="category_row_text">{name}</p>
      </div>
      {areSubcategoriesOpen && (
        <div className="subcategories_row">
          {subCategoryPairs.map((pair, index) => (
            <SubcategoryColumn subcategories={pair} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryRow;
