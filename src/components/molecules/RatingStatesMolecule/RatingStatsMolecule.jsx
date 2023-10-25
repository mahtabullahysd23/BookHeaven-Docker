import React from "react";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import "./RatingStatsMolecule.style.scss";
const RatingStatsMolecule = ({five, four, three, two, one,total}) => {
  return (
    <div className="rating-stats">
      <div className="single-stats flex-between">
        <p className="rating-label">5 star</p>
            <ProgressBar value={five} max={total}/>
        <div className="rating-value">{`(${five})`}</div>
      </div>
      <div className="single-stats flex-between">
        <div className="rating-label">4 star</div>
            <ProgressBar value={four} max={total}/>
        <p className="rating-value">{`(${four})`}</p>
      </div>
      <div className="single-stats flex-between">
        <div className="rating-label">3 star</div>
            <ProgressBar value={three} max={total}/>
        <p className="rating-value">{`(${three})`}</p>
      </div>
      <div className="single-stats flex-between">
        <div className="rating-label">2 star</div>
            <ProgressBar value={two} max={total}/>
        <p className="rating-value">{`(${two})`}</p>
      </div>
      <div className="single-stats flex-between">
        <div className="rating-label">1 star</div>
            <ProgressBar value={one} max={total}/>
        <p className="rating-value">{`(${one})`}</p>
      </div>
    </div>
  );
};

export default RatingStatsMolecule;
