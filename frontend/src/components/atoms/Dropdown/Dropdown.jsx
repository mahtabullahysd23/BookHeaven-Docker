import React, { useState } from "react";
import "./Dropdown.style.scss";

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (index, option) => {

    if (index === 0) {
      onSelect({
        option: option,
        sort: "default",
        order: "default",
      });
    }
   
    if (index === 1) {
      onSelect({
        option: option,
        sort: "price",
        order: "asc",
      });
    }

    if (index === 2) {
      onSelect({
        option: option,
        sort: "price",
        order: "desc",
      });
    }

    if (index === 3) {
      onSelect({
        option: option,
        sort: "name",
        order: "asc",
      });
    }
    if (index === 4) {
      onSelect({
        option: option,
        sort: "name",
        order: "desc",
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <span className={`arrow ${isOpen ? "rotate" : ""}`}>&#9660;</span>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(index, option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
