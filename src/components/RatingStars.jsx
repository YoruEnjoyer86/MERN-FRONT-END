import React from "react";
import "./RatingStars.css";

const emptyStarPath = "../../public/empty_star.png";
const fullStarPath = "../../public/full_star.png";

const RatingStars = ({ value, className, nrReviews }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className={"rating_stars_row " + className}>
      {stars.map((nr) => (
        <img
          src={value >= nr ? fullStarPath : emptyStarPath}
          className="rating_star"
          key={nr}
        />
      ))}
      <div className="row">
        <p className="rating_stars_number">{value}</p>
        <p className="rating_stars_nr_reviews">{"(" + nrReviews + ")"}</p>
      </div>
    </div>
  );
};

export default RatingStars;
