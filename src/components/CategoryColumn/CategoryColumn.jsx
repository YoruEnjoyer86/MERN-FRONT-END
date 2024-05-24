import React, { useEffect, useState } from "react";
import "./CategoryColumn.css";
import axios from "axios";

const CategoryColumn = ({ category }) => {
  //   console.log(pair);
  const [subcategories, setSubcategories] = useState([]);

  const FetchSubcategories = async () => {
    let res = await axios.post("http://localhost:3001/get_subcategories", {
      category,
    });
    setSubcategories(res.data.subcategories);
  };

  useEffect(() => {
    FetchSubcategories();
  }, []);

  useEffect(() => {
    // console.log("Nume :" + category.name + " subcat : " + subcategories);
  }, [subcategories]);

  return (
    <div className="category_column">
      <p className="category_text_categories_dropdown">{category.name}</p>
      <div className="subcategories_column">
        {subcategories.map((subcat, index) => (
          <p key={index} className="subcategory_name_text">
            {subcat.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategoryColumn;
