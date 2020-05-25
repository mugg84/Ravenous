import React from "react";
import "./DisplaySearchBar.css";
//Import React Script Libraray to load Google object
import Script from "react-load-script";

class DisplaySearchBar extends React.Component {
  render() {
    return (
      <div className="SearchBar" onKeyPress={this.handleSearch}>
        <div className="SearchBar-sort-options">
          <ul>{this.props.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input
            onChange={this.props.handleTermChange}
            placeholder="Search Businesses"
          />
          <Script
            url={this.props.googleUrl}
            onLoad={this.props.handleScriptLoad}
          />
          <input
            onChange={this.props.handleLocationChange}
            placeholder="Where?"
            id="autocomplete"
          />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.props.handleSearch}>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default DisplaySearchBar;
