import React from "react";
import "./SearchBar.css";
import DisplaySearchBar from "../DisplaySearchBar/DisplaySearchBar";

const googleKey = "Insert Key";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",

      //states for autcmplete
      city: "",
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderSortByOptions = this.renderSortByOptions.bind(this);

    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count",
      "The Nearest": "distance",
    };

    this.googleUrl = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`;
  }

  // give active class to option selected
  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return "active";
    } else {
      return "";
    }
  }

  // set the state of a sorting option
  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption });
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );
  }

  // handle changes business inpuut
  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  // hande changes location input
  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  // when pressed button gives details for searchYelp
  handleSearch(event) {
    if (event.type === "click" || event.key === "Enter") {
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
      event.preventDefault();
    }
  }

  handleScriptLoad = () => {
    const options = {
      types: ["(cities)"],
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    // address.
    this.autocomplete.setFields(["address_components", "formatted_address"]);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        city: address[0].long_name,
      });
    }
  };

  // displays the options in the searchBar

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          className={this.getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          onClick={() => this.handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }

  render() {
    return (
      <DisplaySearchBar
        renderSortByOptions={this.renderSortByOptions}
        handleTermChange={this.handleTermChange}
        googleUrl={this.googleUrl}
        handleScriptLoad={this.handleScriptLoad}
        handleLocationChange={this.handleLocationChange}
        handleSearch={this.handleSearch}
      />
    );
  }
}

export default SearchBar;
