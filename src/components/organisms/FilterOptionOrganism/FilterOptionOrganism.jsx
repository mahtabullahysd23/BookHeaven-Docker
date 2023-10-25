import React, { useEffect } from "react";
import Search from "../../atoms/Search/Search";
import RangeSlider from "../../atoms/RangeSlider/RangeSlider";
import "./FilterOptionOrganism.style.scss";
import FilterOptionsMolecule from "../../molecules/FilterOptionsMolecule/FilterOptionsMolecule";
import { useDispatch } from "react-redux";
import { addFilter } from "../../../Store/Slices/filterSlice";
import { useSelector } from "react-redux";
import { useCheckboxState } from "pretty-checkbox-react";
import Button from "../../atoms/Buttons/Button";

const FilterOptionOrganism = () => {
  const filterString = useSelector((state) => state.filter.filterString);
  const checkboxAvailability = useCheckboxState({ state: [] });
  const checkboxGenre = useCheckboxState({ state: [] });
  const checkboxLanguage = useCheckboxState({ state: [] });
  const checkboxTag = useCheckboxState({ state: [] });

  const dispatch = useDispatch();
  const minRangeValue = 20;
  const maxRangeValue = 200;
  const step = 10;
  const handleRangeChange = (newRange) => {
    if (filterString.includes("PriceBetween=")) {
      const appliedFilter = filterString.replace(
        /PriceBetween=[^&]+/,
        "PriceBetween=" + `${newRange[0]},${newRange[1]}`
      );
      dispatch(addFilter(appliedFilter));
    } else {
      const appliedFilter =
        filterString + "PriceBetween=" + `${newRange[0]},${newRange[1]}` + "&";
      dispatch(addFilter(appliedFilter));
    }
  };

  const handleClear = () => {
    const match = filterString.match(/Page=(\d+)/);
    if (match) {
      const page = match[1];
      dispatch(addFilter(`/books?Page=${page}&`));
    } else {
      dispatch(addFilter("/books?"));
    }
    checkboxAvailability.setState([]);
    checkboxGenre.setState([]);
    checkboxLanguage.setState([]);
    checkboxTag.setState([]);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      const appliedFilter = filterString.replace(/Search=[^&]+&/, "");
      dispatch(addFilter(appliedFilter));
      return;
    }
    if (filterString.includes("Search=")) {
      const appliedFilter = filterString.replace(
        /Search=[^&]+/,
        "Search=" + searchTerm
      );
      dispatch(addFilter(appliedFilter));
    } else {
      const appliedFilter = filterString + "Search=" + searchTerm + "&";
      dispatch(addFilter(appliedFilter));
    }
  };
  useEffect(() => {
    if (checkboxAvailability.state.includes("In Stock")) {
      if (filterString.includes("/Stock=[^&]+stockOperator=[^&]+&/")) {
        const appliedFilter = filterString.replace(
          /Stock=[^&]+stockOperator=[^&]+&/,
          "Stock=0&stockOperator=gt&"
        );
        dispatch(addFilter(appliedFilter));
      } else {
        const appliedFilter = filterString + "Stock=0&stockOperator=gt&";
        dispatch(addFilter(appliedFilter));
      }
    }
    if (checkboxAvailability.state.includes("In Stock") == false) {
      const appliedFilter = filterString.replace(
        "Stock=0&stockOperator=gt&",
        ""
      );
      dispatch(addFilter(appliedFilter));
    }
  }, [checkboxAvailability.state.length]);

  useEffect(() => {
    if (checkboxGenre.state.length > 0) {
      const appliedFilter = [];
      checkboxGenre.state.map((genre) => {
        appliedFilter.push("Genre=" + genre + "&");
      });
      const appliedFilterString = filterString.replace(/Genre=[^&]+&/g, "");
      const newString = appliedFilterString + appliedFilter.join("");
      dispatch(addFilter(newString));
    } else {
      const appliedFilter = filterString.replace(/Genre=[^&]+&/g, "");
      dispatch(addFilter(appliedFilter));
    }
  }, [checkboxGenre.state.length]);

  useEffect(() => {
    if (checkboxTag.state.length > 0) {
      const appliedFilter = [];
      checkboxTag.state.map((tag) => {
        appliedFilter.push("Tag=" + tag + "&");
      });
      const appliedFilterString = filterString.replace(/Tag=[^&]+&/g, "");
      const newString = appliedFilterString + appliedFilter.join("");
      dispatch(addFilter(newString));
    } else {
      const appliedFilter = filterString.replace(/Tag=[^&]+&/g, "");
      dispatch(addFilter(appliedFilter));
    }
  }, [checkboxTag.state.length]);

  useEffect(() => {
    if (checkboxLanguage.state.length > 0) {
      const appliedFilter = [];
      checkboxLanguage.state.map((language) => {
        appliedFilter.push("Language=" + language + "&");
      });
      const appliedFilterString = filterString.replace(/Language=[^&]+&/g, "");
      const newString = appliedFilterString + appliedFilter.join("");
      dispatch(addFilter(newString));
    } else {
      const appliedFilter = filterString.replace(/Language=[^&]+&/g, "");
      dispatch(addFilter(appliedFilter));
    }
  }, [checkboxLanguage.state.length]);

  return (
    <div className="filter-option">
      <Search onSearch={handleSearch} />
      <div className="price-range">
        <p>Price range</p>
        <RangeSlider
          max={maxRangeValue}
          min={minRangeValue}
          step={step}
          onChange={handleRangeChange}
        />
      </div>

      <FilterOptionsMolecule
        title="Availability"
        options={["In Stock"]}
        checkbox={checkboxAvailability}
      />

      <FilterOptionsMolecule
        title="Genre"
        options={[
          "Mystery",
          "Romance",
          "Fantasy",
          "Thriller",
          "Drama",
          "Fiction",
        ]}
        checked="false"
        checkbox={checkboxGenre}
      />

      <FilterOptionsMolecule
        title="Language"
        options={["English", "Bengali", "Spanish", "Japanese"]}
        checked="false"
        checkbox={checkboxLanguage}
      />

      <FilterOptionsMolecule
        title="Tag"
        options={["featured", "new", "sale", "trending"]}
        checked="false"
        checkbox={checkboxTag}
      />

      <Button className="ash-button mt-2" text="clear all" onClick={handleClear} />
    </div>
  );
};

export default FilterOptionOrganism;
