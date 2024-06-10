import React, { useContext } from "react";
import "./CategoriesButton.css";
import MegaCategoryRow from "../MegaCategoryRow/MegaCategoryRow";
import DropdownButton from "../DropdownButton/DropdownButton";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import base_url from "../../base_url";

const more_options_image = (
  await axios.post(base_url + "/get_image", {
    img_name: "three_lines.png",
  })
).data.img;

const CategoriesButton = () => {
  const [megaCategories, setMegaCategories] = useState([]);
  const FetchMegaCategories = async () => {
    let res = await axios.post(base_url + "/get_mega_categories");
    setMegaCategories(res.data.megaCategories);
    // console.log(res.data.megaCategories);
  };

  useEffect(() => {
    FetchMegaCategories();
  }, []);

  const [areCategoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const FetchCategories = async (megacategory) => {
    let res = await axios.post(base_url + "/get_categories", {
      mega_category: megacategory,
    });
    setCategories(res.data.categories);
    // console.log(res.data.categories);
  };

  //   useEffect(() => {
  //     console.log("categories updated!");
  //   }, categories);

  return (
    <DropdownButton
      isBackgroundVisible={true}
      className={"more_options_button"}
      button={<img src={more_options_image} className="more_options_image" />}
    >
      <div className="dropdown_categories_row">
        <div className="megacategories_name_and_icon_column">
          {megaCategories.map((megaCat, index) => (
            <MegaCategoryRow
              key={index}
              megacategory={megaCat}
              setCategoriesOpen={setCategoriesOpen}
              FetchCategories={FetchCategories}
            />
          ))}
        </div>
        {areCategoriesOpen && (
          <div className="categories_row">
            {categories.map((cat, index) => (
              <CategoryColumn category={cat} key={cat.name + index} />
            ))}
          </div>
        )}
      </div>
    </DropdownButton>
  );
};

export default CategoriesButton;
