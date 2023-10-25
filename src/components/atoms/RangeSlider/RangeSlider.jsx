import React, { useState } from "react";
import ReactSlider from "react-slider";
import "./RangeSlider.style.scss";

const RangeSlider = ({ min, max, step, onChange }) => {
  const handleRangeChange = (newRange) => {
    onChange(newRange);
  };

  return (
    <ReactSlider
      defaultValue={[min, max]}
      ariaLabel={["Lower thumb", "Upper thumb"]}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      minDistance={10}
      withTracks
      max={max}
      min={min}
      step={step}
      onAfterChange={handleRangeChange}
    />
  );
};

export default RangeSlider;
