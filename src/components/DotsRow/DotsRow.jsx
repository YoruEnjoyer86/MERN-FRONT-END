import React from "react";
import "./DotsRow.css";
import axios from "axios";
import base_url from "../../base_url";

const unselectedDotImg = (
  await axios.post(base_url + "/get_image", {
    img_name: "circle.png",
  })
).data.img;
const selectedDotImg = (
  await axios.post(base_url + "/get_image", {
    img_name: "selected_dot.png",
  })
).data.img;

const DotsRow = ({ nrDots, currentDot, ChangeCurrentDot }) => {
  let a = Array(nrDots)
    .fill(0)
    .map((val, index) => index);
  return (
    <div className="dots_container">
      {a.map((val) => (
        <img
          className="dot"
          src={val === currentDot ? selectedDotImg : unselectedDotImg}
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
