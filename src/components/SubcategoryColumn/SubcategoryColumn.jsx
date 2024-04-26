import React from "react";
import "./SubcategoryColumn.css";

const SubcategoryColumn = ({ subcategories }) => {
  //   console.log(pair);
  return (
    <div className="subcategories_column">
      <p className="subcategory_text">{subcategories[0]}</p>
      <p className="subcategory_text">{subcategories[1]}</p>
    </div>
  );
};

export default SubcategoryColumn;
