import React from "react";
import "./SortedItemsColumn.css";
import DropdownButton from "../DropdownButton/DropdownButton";

const SortedItemsColumn = ({
  title = "BASIC TITLE",
  details = "no details",
  buttonNames,
}) => {
  return (
    <div className="sorted_items_column">
      <div className="sorted_items_column_title_row">
        <div className="text_row">
          <p className="sorted_items_column_title">
            {title}{" "}
            <span className="sorted_items_column_details">{details}</span>
          </p>
        </div>
        <div className="buttons_row">
          {buttonNames.map((buttonName, index) => (
            <button
              key={index}
              className={"title_row_button " + "margin_right"}
            >
              {buttonName}
            </button>
          ))}
        </div>
      </div>

      <div className="filter_row">
        <p className="filter_text">Order by</p>
        <DropdownButton
          button={
            <div className="filter_button">
              <p className="filter_button_text">FILTER</p>
              <img src="/down_arrow.png" className="filter_button_image" />
            </div>
          }
        >
          <div className="filter_button">
            <p className="filter_button_text">Date added</p>
            <span className="space" />
          </div>
          <div className="filter_button">
            <p className="filter_button_text">Priority</p>
            <span className="space" />
          </div>
        </DropdownButton>
      </div>
    </div>
  );
};

export default SortedItemsColumn;
