import React, { useContext } from "react";
import "./SearchBar.css";
import DisplaySearchBar from "../DisplaySearchBar/DisplaySearchBar";
import RavContext from "../../context/rav/ravContext";


const SearchBar = () => {
  const ravContext = useContext(RavContext);

  const {sortBy, handleSortByChange} = ravContext 

  const sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count",
    "The Nearest": "distance",
  };

  // give active class to option selected
  const getSortByClass = (sortByOption) => {
    if (sortBy === sortByOption) {
      return "active";
    } else {
      return "";
    }
  };

  // displays the options in the searchBar

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          className={getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          onClick={() => handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <DisplaySearchBar
      renderSortByOptions={renderSortByOptions}
    />
  );
};

export default SearchBar;
