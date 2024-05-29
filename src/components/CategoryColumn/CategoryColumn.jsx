import React, { useContext, useEffect, useState } from "react";
import "./CategoryColumn.css";
import axios from "axios";
import { AppContext } from "../../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

const CategoryColumn = ({ category }) => {
  //   console.log(pair);
  const [subcategories, setSubcategories] = useState([]);
  const { set_search_data } = useContext(AppContext);
  const navigate = useNavigate();

  const FetchSubcategories = async () => {
    let res = await axios.post("http://localhost:3001/get_subcategories", {
      category,
    });
    setSubcategories(res.data.subcategories);
  };

  const OnCategoryNameClick = async () => {
    let new_search_data = {
      category,
    };
    let res = await axios.post("http://localhost:3001/set_search_data", {
      search_data: new_search_data,
    });
    set_search_data(new_search_data);
    navigate("/search");
  };

  const OnSubcategoryNameClick = async (subcategory) => {
    let new_search_data = {
      subcategory,
    };
    let res = await axios.post("http://localhost:3001/set_search_data", {
      search_data: new_search_data,
    });
    set_search_data(new_search_data);
    navigate("/search");
  };

  useEffect(() => {
    FetchSubcategories();
  }, []);

  useEffect(() => {
    // console.log("Nume :" + category.name + " subcat : " + subcategories);
  }, [subcategories]);

  return (
    <div className="category_column">
      <p
        className="category_text_categories_dropdown"
        onClick={OnCategoryNameClick}
      >
        {category.name}
      </p>
      <div className="subcategories_column">
        {subcategories.map((subcat, index) => (
          <p
            key={index}
            className="subcategory_name_text"
            onClick={() => {
              OnSubcategoryNameClick(subcat);
            }}
          >
            {subcat.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategoryColumn;
