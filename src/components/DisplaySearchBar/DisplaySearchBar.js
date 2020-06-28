import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./DisplaySearchBar.css";
import RavContext from "../../context/rav/ravContext";

const DisplaySearchBar = ({ renderSortByOptions }) => {
  const ravContext = useContext(RavContext);

  const { handleTermChange, handleLocationChange } = ravContext;

  // when pressed button gives details for searchYelp
  const handleSearch = (event) => {
    if (event.type === "click" || event.key === "Enter") {
      ravContext.searchYelp();
      event.preventDefault();
    }
  };

  return (
    <div className="SearchBar" onKeyPress={handleSearch}>
      <div className="SearchBar-sort-options">
        <ul>{renderSortByOptions()}</ul>
      </div>
      <div className="SearchBar-fields">
        <input onChange={handleTermChange} placeholder="Search Businesses" />
        <input
          onChange={handleLocationChange}
          placeholder="Where?"
          id="autocomplete"
        />
      </div>
      <div className="SearchBar-submit">
        <a href="/#" onClick={handleSearch}>
          Let's Go
        </a>
      </div>
    </div>
  );
};

DisplaySearchBar.propTypes = {
  renderSortByOptions: PropTypes.func.isRequired,
};

export default DisplaySearchBar;
