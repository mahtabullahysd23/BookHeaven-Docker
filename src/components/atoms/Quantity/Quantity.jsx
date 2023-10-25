import React, { useState } from "react";
import "./Quantity.style.scss";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Quantity = ({ initialValue, min, max, onChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  useEffect(() => {
    setQuantity(initialValue);
  }, [initialValue]);

  const handleIncrement = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
      onChange(quantity + 1);
    } else {
      toast.error("Not Enough Stock");
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
      onChange(quantity - 1);
    } else {
      toast.error("Minimum Quantity Reached");
    }
  };

  const handleInputChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= min && newQuantity <= max) {
      setQuantity(newQuantity);
        onChange(newQuantity);
    }
  };

  return (
    <div className="quantity">
      <button className="quantity-button" onClick={handleDecrement}>
        -
      </button>
      <input
        className="quantity-input"
        type="numeric"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <button className="quantity-button" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default Quantity;
