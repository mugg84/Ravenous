import React from "react";
import "./SearchBar.css";

import getLocation from "../../util/Geolocation";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
      coordinates: { lat: "", long: "" },
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
    this.getActualLocation = this.getActualLocation.bind(this);

    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count",
      "Nearest Match": "distance",
    };
  }

  getActualLocation() {
    getLocation()
      .then((location) => {
        this.setState({
          coordinates: { lat: location.lat, long: location.long },
        });
      })
      .catch((error) => console.log(error));
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return "active";
    }
    return "";
  }

  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption }, () => {
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
    });
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSearch(event) {
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );

    event.preventDefault();
  }

  handleAutocomplete(event) {
    if (this.state.location.length > 0) {
      this.props.autocompleteYelp(
        this.state.location,
        this.state.coordinates.lat,
        this.state.coordinates.long
      );
    }
  }

  handleOnClick(event) {
    this.handleSearch(event);
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSearch(event);
    } else {
      if (this.state.coordinates.lat == "") {
        this.getActualLocation();
      }
      this.handleAutocomplete(event);
    }
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          className={this.getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input
            className="input"
            placeholder="Search Businesses"
            onChange={this.handleTermChange}
            onKeyPress={this.handleKeyPress}
          />
          <input
            className="input"
            placeholder="Where?"
            onChange={this.handleLocationChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleOnClick}>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
