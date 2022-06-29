const initialState = {
  countries: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    case "POST_ACTIVITIES":
      return {
        ...state,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
