import React from "react";
import "./DotsRow.css";

const unselectedDotImg = "../../public/circle.png";
const selectedDotImg = "../../public/selected_dot.png";

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
