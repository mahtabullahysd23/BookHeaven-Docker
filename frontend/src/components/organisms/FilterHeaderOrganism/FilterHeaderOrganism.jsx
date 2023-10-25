import React from "react";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import { FaThList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import "./FilterHeaderOrganism.style.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFilter } from "../../../Store/Slices/filterSlice";
import  changeOrientation  from "../../../Store/Slices/bookSlice";
const FilterHeaderOrganism = () => {
  const [selectedOption, setSelectedOption] = useState("Default sorting");
  const filterString = useSelector((state) => state.filter.filterString);
  const dispatch = useDispatch();

  const onSelect = (option) => {
    setSelectedOption(option.option);

    if (option.option === "Default sorting") {
      const appliedFilter = filterString.replace(
        /SortBy=[^&]+&SortByType=[^&]+&/,
        ""
      );
      dispatch(addFilter(appliedFilter));
      return;
    } else if (
      filterString.includes("SortBy=") &&
      filterString.includes("SortByType=")
    ) {
      const appliedFilter = filterString
        .replace(/SortBy=\w+/g, `SortBy=${option.sort}`)
        .replace(/SortByType=\w+/g, `SortByType=${option.order}`);
      dispatch(addFilter(appliedFilter));
    } else {
      const appliedFilter =
        filterString + `SortBy=${option.sort}&SortByType=${option.order}&`;
      dispatch(addFilter(appliedFilter));
    }
  };

  const handleListView = () => {
    dispatch(changeOrientation("list"));
  };
  const handleGrid2xView = () => {
    dispatch(changeOrientation("grid2x"));
  };
  const handleGrid3xView = () => {
    dispatch(changeOrientation("grid3x"));
  };

  return (
    <div className="filter-header">
      <div className="filter-header-left">
        <BsFillFilterSquareFill />
        <p>Filters</p>
      </div>
      <div className="filter-header-right">
        <Dropdown
          options={[
            "Default sorting",
            "Price (Low > High)",
            "Price (High > Low)",
            "Name (A - Z)",
            "Name (Z - A)",
          ]}
          selectedOption={selectedOption}
          onSelect={onSelect}
        />
        <div className="grid button"onClick={handleListView}>
          <FaThList list />
        </div>
        <div grid button className="grid button" onClick={handleGrid2xView}>
          <BsFillGridFill  />
        </div>
        <div className="grid button" onClick={handleGrid3xView}>
          <BsFillGrid3X3GapFill  />
        </div>
      </div>
    </div>
  );
};

export default FilterHeaderOrganism;
