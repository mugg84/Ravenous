import React, { useReducer } from "react";
import RavContext from "./ravContext";
import RavReducer from "./ravReducer";
import Yelp from "../../util/Yelp";
import { SEARCH_YELP, TERM_CHANGE, LOCATION_CHANGE, SORT_CHANGE } from "../types";

const RavState = (props) => {
  const initialState = {
    businesses: [],
    term: "",
    location: "",
    sortBy: "best_match",
  };

  const [state, dispatch] = useReducer(RavReducer, initialState);

  const searchYelp = async () => {
    if (state.term && state.location) {
      const res = await Yelp.search(state.term, state.location, state.sortBy);
      if (res) {
        dispatch({
          type: SEARCH_YELP,
          payload: res,
        });
      }
    }
  };

  // handle changes business inpuut
  const handleTermChange = (event) => {
    dispatch({
      type: TERM_CHANGE,
      payload: event.target.value,
    });
  };

  // hande changes location input
  const handleLocationChange = (event) => {
    dispatch({
      type: LOCATION_CHANGE,
      payload: event.target.value,
    });
  };

  // set the state of a sorting option
  const handleSortByChange = (sortByOption) => {
     dispatch({
       type: SORT_CHANGE,
       payload: sortByOption,
     });
  };
  

  return (
    <RavContext.Provider
      value={{
        businesses: state.businesses,
        term: state.term,
        location: state.location,
        sortBy: state.sortBy,
        searchYelp,
        handleTermChange,
        handleLocationChange,
        handleSortByChange,
      }}
    >
      {props.children}
    </RavContext.Provider>
  );
};

export default RavState;
