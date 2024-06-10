import React from "react";
import "./DotsRow.css";
import axios from "axios";
import base_url from "../../base_url";

const DotsRow = ({ nrDots, currentDot, ChangeCurrentDot }) => {
  let a = Array(nrDots)
    .fill(0)
    .map((val, index) => index);
  return (
    <div className="dots_container">
      {a.map((val) => (
        <img
          className="dot"
          src={val === currentDot ? "/selected_dot.png" : "/circle.png"}
          key={val}
          onClick={() => {
            ChangeCurrentDot(val);
          }}
        />
      ))}
    </div>
  );
};

export default DotsRow;
