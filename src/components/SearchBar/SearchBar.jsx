import React, { useState } from "react";
import "./SearchBar.css";

let text = "";

const HandleOnChange = (event) => {
  text = event.target.value;
  //console.log(text) ;
};

const HandleOnKeyUp = (event) => {
  //console.log(event.key) ;
  if (event.key == "Enter") HandleSearch();
};

const HandleSearch = () => {
  alert("Searching for " + text);
};

const SearchBar = ({ style, className }) => {
  return (
    <div className={"main_search_bar " + className} style={{ ...style }}>
      <input
        className="input_search_bar"
        type="text"
        onChange={() => {
          HandleOnChange(event);
        }}
        onKeyUp={() => {
          HandleOnKeyUp(event);
        }}
        placeholder="Search something!"
      />
    </div>
  );
};

export default SearchBar;
