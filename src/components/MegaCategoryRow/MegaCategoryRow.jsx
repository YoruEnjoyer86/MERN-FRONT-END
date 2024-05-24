import React, { useEffect, useState } from "react";
import "./MegaCategoryRow.css";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import axios from "axios";

const MegaCategoryRow = ({
  megacategory,
  setCategoriesOpen,
  FetchCategories,
}) => {
  const name = megacategory.name;
  let image = "../../../public/" + megacategory.imageName;

  const HandleMouseEnter = () => {
    setCategoriesOpen(true);
    FetchCategories(megacategory);
    // console.log("FETCHING CATS FOR " + megacategory.name);
  };

  // console.log(subCategoryPairs);

  return (
    <div className="mega_category_container" onMouseEnter={HandleMouseEnter}>
      <div className="megacategory_details_container">
        <img className="megacategory_details_image" src={image} />
        <p className="megacategory_details_text">{name}</p>
      </div>
    </div>
  );
};

export default MegaCategoryRow;
