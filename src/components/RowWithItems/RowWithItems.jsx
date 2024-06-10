import React, { useEffect } from "react";
import { useState } from "react";
import "./RowWithItems.css";
import "../DotsRow/DotsRow.jsx";
import DotsRow from "../DotsRow/DotsRow.jsx";

const RowWithItems = ({
  className,
  maxDisplayedItems,
  category,
  rigtArrowImg = "/right_arrow.png",
  leftArrowImg = "/left_arrow.png",
  items,
  hasDots,
  highlightItemsOnClick = false,
  unselectedItemClass = "unselected_item",
  selectedItemClass = "selected_item",
  onItemClick,
}) => {
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const HandleOnRightArrowClick = () => {
    if (firstItemIndex + maxDisplayedItems < items.length)
      setFirstItemIndex(firstItemIndex + maxDisplayedItems);
  };

  const HandleOnLeftArrowClick = () => {
    if (firstItemIndex - maxDisplayedItems >= 0)
      setFirstItemIndex(firstItemIndex - maxDisplayedItems);
  };

  const HandleOnDotClick = (dotIndex) => {
    setFirstItemIndex(dotIndex * maxDisplayedItems);
  };

  const HandleOnCategoryClick = () => {
    //TODO CAUTA CATEGORIA CATEGORY
  };

  return (
    <div className="container_row_with_items">
      {category != "" && <p className="category_text_text">{category}</p>}
      <div className={"items_and_arrows_row " + className}>
        {firstItemIndex - maxDisplayedItems >= 0 && (
          <img
            className="prev_items_arrow"
            src={leftArrowImg}
            onClick={HandleOnLeftArrowClick}
          />
        )}
        <div className="items_row">
          {items.map(
            (item, index) =>
              index >= firstItemIndex &&
              index < firstItemIndex + maxDisplayedItems && (
                <div
                  key={index}
                  className={
                    (highlightItemsOnClick && "div_with_item_border ") +
                    (index === selectedItem
                      ? selectedItemClass
                      : unselectedItemClass) +
                    " " +
                    (index != items.length - 1 && "margin_after_item")
                  }
                  onClick={() => {
                    setSelectedItem(index);
                    onItemClick(index);
                  }}
                >
                  {item}
                </div>
              )
          )}
        </div>
        {firstItemIndex + maxDisplayedItems < items.length && (
          <img
            className="next_items_arrow"
            src={rigtArrowImg}
            onClick={HandleOnRightArrowClick}
          />
        )}
      </div>
      {hasDots && (
        <DotsRow
          nrDots={Math.ceil(items.length / maxDisplayedItems)}
          currentDot={firstItemIndex / maxDisplayedItems}
          ChangeCurrentDot={HandleOnDotClick}
        />
      )}
    </div>
  );
};

export default RowWithItems;
