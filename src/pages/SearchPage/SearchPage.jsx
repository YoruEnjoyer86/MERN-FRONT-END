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
  const { search_data, set_search_data } = useContext(AppContext);

  const FetchProductsFromSearchData = async () => {
    if (search_data == undefined) {
      console.log("IN SEARCH PAGE, SEARCH DATA UNDEFINED!");
      return;
    }
    if (
      search_data.mega_category == undefined &&
      search_data.category == undefined &&
      search_data.subcategory == undefined &&
      search_data.text != undefined
    ) {
      console.log("SEARCHING FOR TEXT!");
      let res = await axios.post(
        "http://localhost:3001/get_products_with_name_and_categories",
        {
          text: search_data.text,
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
    FetchProductsFromSearchData();
  };

  useEffect(() => {
    FetchProductsFromSearchData();
    if (search_data != undefined) {
      if (search_data.mega_category != undefined)
        for (let i = 0; i < megaCategories.length; i++)
          if (megaCategories[i]._id == search_data.mega_category._id) {
            setMegaCategoryIndex(i);
            break;
          }
      if (search_data.category != undefined)
        for (let i = 0; i < categories.length; i++)
          if (categories[i]._id == search_data.category._id) {
            setCategoryIndex(i);
            break;
          }
      if (search_data.subcategory != undefined)
        for (let i = 0; i < subcategories.length; i++)
          if (subcategories[i]._id == search_data.subcategory._id) {
            setSubCategoryIndex(i);
            break;
          }
    }
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
          <button className="search_button_search_page">Filter</button>
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
