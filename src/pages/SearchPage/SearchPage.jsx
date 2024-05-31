import React, { useContext } from "react";
import "./SearchPage.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel.jsx";
import ProductShortDisplay from "../../components/ProductShortDisplay/ProductShortDisplay.jsx";
import { AppContext } from "../../Contexts/AppContext.js";

const SearchPage = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [megaCategoryIndex, setMegaCategoryIndex] = useState(0);
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  const [megaCategories, setMegaCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [foundProducts, setFoundProducts] = useState([]);
  const {
    search_data,
    set_search_data,
    appliedSearchFilters,
    setAppliedSearchFilters,
  } = useContext(AppContext);

  const FetchProductsFromSearchData = async () => {
    if (search_data == undefined) {
      // console.log("IN SEARCH PAGE, SEARCH DATA UNDEFINED!");
      return;
    }
    if (search_data.text != undefined) {
      // console.log("SEARCHING FOR TEXT!");
      let res = await axios.post(
        "http://localhost:3001/get_products_with_name_and_categories",
        {
          text: search_data.text,
          mega_category: search_data.mega_category,
          category: search_data.category,
          subcategory: search_data.subcategory,
        }
      );
      // console.log(res.data);
      setFoundProducts(res.data);
      return;
    }
    let categories = {
      mega_category: search_data.mega_category,
      category: search_data.category,
      subcategory: search_data.subcategory,
    };
    let catId;
    let catType = 0;
    if (categories.subcategory != undefined) {
      catId = categories.subcategory;
      catType = 0;
    } else if (categories.category != undefined) {
      catId = categories.category;
      catType = 1;
    } else {
      catId = categories.mega_category;
      catType = 2;
    }
    let res = await axios.post(
      "http://localhost:3001/get_products_of_any_type_categoryID",
      {
        id: catId,
        categoryType: catType,
      }
    );
    setFoundProducts(res.data.products);
  };

  const FetchFilteredProducts = () => {
    let new_search_data = { ...search_data };
    new_search_data.mega_category = megaCategories[megaCategoryIndex];
    new_search_data.category = categories[categoryIndex];
    new_search_data.subcategory =
      subcategories.length == 0 ? undefined : subcategories[subCategoryIndex];
    set_search_data(new_search_data);
    setAppliedSearchFilters({
      mega_category: new_search_data.mega_category,
      category: new_search_data.category,
      subcategory: new_search_data.subcategory,
    });
    // console.log("FILTER:");
    // console.log(new_search_data);
  };

  const GetSearchedThing = () => {
    if (search_data == undefined) return "search_data_undefined";
    if (search_data.text != undefined) return search_data.text;
    if (search_data.subcategory != undefined)
      return search_data.subcategory.name;
    if (search_data.category != undefined) return search_data.category.name;
    if (search_data.mega_category != undefined)
      return search_data.mega_category.name;
  };

  const FetchCategories = async () => {
    let res;
    if (megaCategories.length != 0)
      res = await axios.post("http://localhost:3001/get_categories", {
        mega_category: megaCategories[megaCategoryIndex],
      });
    if (res != undefined) {
      let cats = res.data.categories;
      cats.push(undefined);
      setCategories(cats);
    }
  };

  const FetchSubCategories = async () => {
    if (categories.length == 0) return;
    let res;
    if (typeof categories[categoryIndex] == "undefined") {
      setSubcategories([]);
      return;
    }
    // console.log(typeof categories[categoryIndex]);
    res = await axios.post("http://localhost:3001/get_subcategories", {
      category: categories[categoryIndex],
    });
    if (res != undefined) {
      let subcats = res.data.subcategories;
      subcats.push(undefined);
      setSubcategories(subcats);
    }
  };

  const Initialize = async () => {
    let res = await axios.post("http://localhost:3001/get_mega_categories");
    setMegaCategories(res.data.megaCategories);
    let cats = await axios.post("http://localhost:3001/get_categories", {
      mega_category: res.data.megaCategories[0],
    });
    setCategories(cats.data.categories);
    FetchProductsFromSearchData();
  };

  useEffect(() => {
    FetchProductsFromSearchData();

    // console.log("GETTING PRODUCTS");
  }, [search_data]);

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

  useEffect(() => {
    // console.log("PRODUCTS CHANGED!");
    // console.log(foundProducts);
  }, [foundProducts]);

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
          <button
            className="filter_button_search_page"
            onClick={FetchFilteredProducts}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="search_results_column_search_page">
        <div className="search_details_column">
          <p className="search_details_text">
            Showing results for <span>"</span>
            <span className="search_details_result_text">
              {GetSearchedThing()}
            </span>
            <span>"</span>
            {Object.keys(appliedSearchFilters).length > 0 &&
              " in " +
                (appliedSearchFilters.subcategory != undefined
                  ? appliedSearchFilters.subcategory.name
                  : appliedSearchFilters.category != undefined
                  ? appliedSearchFilters.category.name
                  : appliedSearchFilters.mega_category != undefined
                  ? appliedSearchFilters.mega_category.name
                  : "HOW ?")}
          </p>
        </div>
        <div className="search_page_products_container">
          {foundProducts.map((prod, index) => (
            <ProductShortDisplay product={prod} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
