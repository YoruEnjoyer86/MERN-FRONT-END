import React from "react";
import "./SearchPage.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel.jsx";
import ProductShortDisplay from "../../components/ProductShortDisplay/ProductShortDisplay.jsx";

const SearchPage = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [megaCategoryIndex, setMegaCategoryIndex] = useState(0);
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  const [megaCategories, setMegaCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [foundProducts, setFoundProducts] = useState([]);

  const FetchFoundProducts = async () => {
    let res = await axios.post(
      "http://localhost:3001/get_products_of_any_type_categoryID",
      {
        id: "665064c313faede67f9ef7c4",
        categoryType: 2,
      }
    );
    setFoundProducts(res.data.products);
  };

  const FetchCategories = async () => {
    let res;
    if (megaCategories.length != 0)
      res = await axios.post("http://localhost:3001/get_categories", {
        mega_category: megaCategories[megaCategoryIndex],
      });
    if (res != undefined) {
      setCategories(res.data.categories);
    }
  };

  const FetchSubCategories = async () => {
    let res;
    if (categories.length != 0) {
      res = await axios.post("http://localhost:3001/get_subcategories", {
        category: categories[categoryIndex],
      });
    }
    if (res != undefined) setSubcategories(res.data.subcategories);
  };

  const Initialize = async () => {
    let res = await axios.post("http://localhost:3001/get_mega_categories");
    setMegaCategories(res.data.megaCategories);
    let cats = await axios.post("http://localhost:3001/get_categories", {
      mega_category: res.data.megaCategories[0],
    });
    setCategories(cats.data.categories);
    FetchFoundProducts();
  };

  useEffect(() => {
    Initialize();
  }, []);

  useEffect(() => {
    setCategoryIndex(0);
    FetchCategories();
  }, [megaCategoryIndex, megaCategories]);

  useEffect(() => {
    setSubCategoryIndex(0);
    FetchSubCategories();
  }, [categories, categoryIndex]);

  return (
    <div className="search_page">
      <NavBar />
      <div className="left_column_search_page">
        <div className="category_selector_column">
          <InputWithLabel
            label="mega category"
            inputType="choices"
            value={megaCategoryIndex}
            setValue={setMegaCategoryIndex}
            selectId="mega_category_select"
            options={megaCategories}
          />
          <InputWithLabel
            label="category"
            inputType="choices"
            value={categoryIndex}
            setValue={setCategoryIndex}
            options={categories}
          />
          <InputWithLabel
            label="sub category"
            inputType="choices"
            value={subCategoryIndex}
            setValue={setSubCategoryIndex}
            options={subcategories}
          />
        </div>

        <div className="price_filter_container">Price Range</div>
      </div>

      <div className="search_results_column_search_page">
        <div className="search_details_column">
          <p className="search_details_text">
            Showing results for
            <span className="search_details_result_text">{'"RESULT"'}</span>
          </p>
        </div>
        <div className="search_page_products_container">
          {foundProducts.map((prod) => (
            <ProductShortDisplay product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
