import React, { useContext, useEffect, useState } from "react";
import "./MegaCategoryRow.css";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import axios from "axios";
import { AppContext } from "../../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

const MegaCategoryRow = ({
  megacategory,
  setCategoriesOpen,
  FetchCategories,
}) => {
  const name = megacategory.name;
  let image = "../../../public/" + megacategory.imageName;
  const { set_search_data, search_data } = useContext(AppContext);
  const navigate = useNavigate();

  const HandleMouseEnter = () => {
    setCategoriesOpen(true);
    FetchCategories(megacategory);
    // console.log("FETCHING CATS FOR " + megacategory.name);
  };

  // console.log(subCategoryPairs);

  const HandleMegaCategoryOnClick = async () => {
    let new_search_data = {
      mega_category: megacategory,
    };
    let res = await axios.post("http://localhost:3001/set_search_data", {
      search_data: new_search_data,
    });
    set_search_data(new_search_data);
    navigate("/search");
  };

  return (
    <div
      className="mega_category_container"
      onMouseEnter={HandleMouseEnter}
      onClick={HandleMegaCategoryOnClick}
    >
      <div className="megacategory_details_container">
        <img className="megacategory_details_image" src={image} />
        <p className="megacategory_details_text">{name}</p>
      </div>
    </div>
  );
};

export default MegaCategoryRow;
