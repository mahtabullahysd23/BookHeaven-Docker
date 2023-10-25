import React from "react";
import "./StarRadio.style.scss";
const StarRadio = ({field}) => {
  return (
    <>
      <div className="rating">
        <input {...field} value={5} name="rating" id="star5" type="radio" />
        <label htmlFor="star5"></label>
        <input {...field} value={4} name="rating" id="star4" type="radio" />
        <label htmlFor="star4"></label>
        <input {...field} value={3} name="rating" id="star3" type="radio" />
        <label htmlFor="star3"></label>
        <input {...field} value={2} name="rating" id="star2" type="radio" />
        <label htmlFor="star2"></label>
        <input {...field} value={1} name="rating" id="star1" type="radio" />
        <label htmlFor="star1"></label>
      </div>
    </>
  );
};

export default StarRadio;
