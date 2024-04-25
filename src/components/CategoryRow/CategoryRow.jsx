import React from "react";
import "./CategoryRow.css";

const CategoryRow = ({ image, name }) => {
  return (
    <div className="category_row_container">
      <img className="category_row_image" src={image} />
      <p className="category_row_text">{name}</p>
    </div>
  );
};

export default CategoryRow;
