import React, { useContext, useEffect, useState } from "react";
import "./SearchBar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";

let text = "";

const SearchBar = ({ className }) => {
  const {
    setOnLickFunction,
    set_search_data,
    searched_data,
    setAppliedSearchFilters,
    set_product_page_product_id,
    invisibleBoxOnClick,
  } = useContext(AppContext);
  const [areSearchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isXVisible, setXVisible] = useState(false);
  const navigate = useNavigate();

  const HandleSearch = async (text) => {
    let new_search_data = {
      text,
    };
    await axios.post("http://localhost:3001/set_search_data", {
      search_data: new_search_data,
    });
    set_search_data(new_search_data);
    navigate("/search");
    EraseSearchText();
    setAppliedSearchFilters({});
  };

  const HandleOnKeyUp = (event) => {
    //console.log(event.key) ;
    if (event.key == "Enter") HandleSearch(event.target.value);
  };

  const EraseSearchText = () => {
    // console.log(document.getElementById("search_bar_input"));
    document.getElementById("search_bar_input").value = "";
    setSearchResults([]);
    document.getElementById("search_bar_input").focus();
    setXVisible(false);
  };

  const GoToProduct = (prod) => {
    navigate("/product");
  };

  const GoToSearchPage = () => {
    navigate("/search");
  };

  const HandleOnChange = async (event) => {
    text = event.target.value;
    if (text.length != 0) {
      setSearchResultsVisible(true);
      let res = await axios.post("http://localhost:3001/get_search_results", {
        text,
      });
      setSearchResults(res.data.results);
      // console.log(res.data.results);
      setXVisible(true);
    } else {
      setSearchResults([]);
      setSearchResultsVisible(false);
      setXVisible(false);
    }
    // console.log(text.length);
  };

  useEffect(() => {
    // console.log("added onCLICK TO INVISIBLE BOX FROM SEARCH BAR");
    let newInvisibleBoxClick = () => {
      invisibleBoxOnClick();
      setSearchResultsVisible(false);
    };
    setOnLickFunction(newInvisibleBoxClick);
  }, []);

  const OnCategoryClick = async (cat) => {
    let res = await axios.post("http://localhost:3001/set_search_data", {
      search_data: {
        category_of_unknown_type: cat,
      },
    });
    set_search_data(res.data);
    // console.log("SEARCH DATA AFTER ON CAT CLICK : ", res.data);
    GoToSearchPage();
  };

  useEffect(() => {
    // console.log(searchResults);
    // for (let res of searchResults) console.log(res.price == undefined);
  }, [searchResults]);

  const OnProductClick = async (prod) => {
    await axios.post("http://localhost:3001/set_product_page_product_id", {
      id: prod._id,
    });
    set_product_page_product_id(prod._id);
    GoToProduct(prod);
  };

  return (
    <>
      <div className={"main_search_bar " + className}>
        <input
          id="search_bar_input"
          className="input_search_bar"
          type="text"
          onFocus={() => {
            setSearchResultsVisible(true);
          }}
          onChange={() => {
            HandleOnChange(event);
          }}
          onKeyUp={() => {
            HandleOnKeyUp(event);
          }}
          placeholder="Search something!"
        />
        {isXVisible && (
          <img
            className="x_icon_search_bar"
            src="../../../public/x.jpg"
            onClick={EraseSearchText}
          />
        )}
        {areSearchResultsVisible && (
          <div className="search_results_column">
            {searchResults.map((res, index) => (
              <div key={index}>
                {res.price == undefined &&
                  index - 1 >= 0 &&
                  searchResults[index - 1].price != undefined && (
                    <div className="products_categories_search_separator">
                      <p className="products_categories_separator_text">
                        Categories
                      </p>
                    </div>
                  )}
                <div className="search_result_text_container">
                  <p
                    className="result_search_bar_text"
                    onClick={() => {
                      if (res.price == undefined) {
                        OnCategoryClick(res);
                      } else OnProductClick(res);
                      EraseSearchText();
                    }}
                  >
                    {res.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
