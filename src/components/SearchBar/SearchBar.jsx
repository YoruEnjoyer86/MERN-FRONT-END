import React, { useContext, useEffect, useState } from "react";
import "./SearchBar.css";
import axios from "axios";
import { AppContext } from "../../Contexts/AppContext";

let text = "";

const HandleOnKeyUp = (event) => {
  //console.log(event.key) ;
  if (event.key == "Enter") HandleSearch();
};

const HandleSearch = () => {
  alert("Searching for " + text);
};

const SearchBar = ({ className }) => {
  const { setOnLickFunction } = useContext(AppContext);
  const [areSearchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const HandleOnChange = async (event) => {
    text = event.target.value;
    if (text.length != 0) {
      setSearchResultsVisible(true);
      let res = await axios.post("http://localhost:3001/get_search_results", {
        text,
      });
      setSearchResults(res.data.results);
      console.log(res.data.results);
    } else setSearchResultsVisible(false);
    // console.log(text.length);
  };

  useEffect(() => {
    setOnLickFunction(() => {
      setSearchResultsVisible(false);
    });
  }, []);

  useEffect(() => {
    // console.log(searchResults);
  }, [searchResults]);
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
        {areSearchResultsVisible && (
          <div className="search_results_column">
            {searchResults.map((res, index) => (
              <p key={index} className="result_search_bar_text">
                {res.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
