import React from "react";
import "./ProgressBar.style.scss";

function ProgressBar({ value, max }) {
  if (value != 0){
    var percentage = (value / max) * 100;
  }
  else{
    percentage = 0;
  }
    return (
      <div className="progress-bar">
        <div className="progress" style={{ width: `${percentage}%` }}>
          {percentage.toFixed(2)}%
        </div>
      </div>
    );
}

export default ProgressBar;
