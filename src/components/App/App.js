import React from "react";
import "./App.css";

import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";

import Yelp from "../../util/Yelp";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { businesses: [], suggestion: {} };

    this.searchYelp = this.searchYelp.bind(this);
    this.autocompleteYelp = this.autocompleteYelp.bind(this);
  }

  autocompleteYelp(input, latitude, longitude) {
    Yelp.autocomplete(input, latitude, longitude).then((suggestion) => {
      this.setState({ suggestion: suggestion.terms[1] });
      console.log(this.state.suggestion);
    });
  }

  searchYelp(term, location, sortBy) {
    if (term && location) {
      Yelp.search(term, location, sortBy).then((businesses) => {
        this.setState({ businesses: businesses });
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar
          searchYelp={this.searchYelp}
          autocompleteYelp={this.autocompleteYelp}
          suggestion={this.state.suggestion}
        />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
