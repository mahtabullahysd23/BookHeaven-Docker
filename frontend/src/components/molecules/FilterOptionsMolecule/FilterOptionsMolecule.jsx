import React from "react";
import "./FilterOptionsMolecule.style.scss";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";

const FilterOptionsMolecule = ({ title, options, checkbox }) => {
  return (
    <div className="filter-block">
      <p>{title}</p>
      {options.map((option) => (
        <div>
          <Checkbox
            value={option}
            {...checkbox}
            color="success-o"
            shape="curved"
          >
            {option}
          </Checkbox>
        </div>
      ))}
    </div>
  );
};

export default FilterOptionsMolecule;
