import React from "react";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import RavState from "../../context/rav/ravState";

import "./App.css";

const App = () => {
 
  return (
    <RavState>
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList />
      </div>
    </RavState>
  );
};

export default App;
