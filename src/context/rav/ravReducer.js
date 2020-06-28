import {
  SEARCH_YELP,
  TERM_CHANGE,
  LOCATION_CHANGE,
  SORT_CHANGE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_YELP:
      return { ...state, businesses: action.payload };
    case TERM_CHANGE:
      return { ...state, term: action.payload };
    case LOCATION_CHANGE:
      return { ...state, location: action.payload };
    case SORT_CHANGE:
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};
