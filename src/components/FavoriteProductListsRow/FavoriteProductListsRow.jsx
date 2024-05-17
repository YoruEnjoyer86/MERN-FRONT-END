import React, { useState } from "react";
import "./FavoriteProductListsRow.css";
import ShortFavoriteProductsList from "../ShortFavoriteProductsList/ShortFavoriteProductsList";
const FavoriteProductListsRow = () => {
  const [selectedList, setSelectedList] = useState(0);

  const listsDetails = [
    {
      name: "Every Favorite",
      nrProducts: 10,
    },
    {
      name: "Awesome List",
      nrProducts: 420,
    },
    {
      name: "Every Favorite",
      nrProducts: 10,
    },
    {
      name: "Awesome List",
      nrProducts: 420,
    },
    {
      name: "Every Favorite",
      nrProducts: 10,
    },
    {
      name: "Awesome List",
      nrProducts: 420,
    },
    {
      name: "Every Favorite",
      nrProducts: 10,
    },
    {
      name: "Awesome List",
      nrProducts: 420,
    },
    {
      name: "Every Favorite",
      nrProducts: 10,
    },
    {
      name: "Awesome List",
      nrProducts: 420,
    },
  ];

  return (
    <div className="lists_row">
      {listsDetails.map((details, index) => (
        <ShortFavoriteProductsList
          listDetails={details}
          HandleClick={() => {
            setSelectedList(index);
          }}
          key={index}
          isSelected={selectedList === index}
        />
      ))}
    </div>
  );
};

export default FavoriteProductListsRow;
