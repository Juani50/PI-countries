const initialState = {
  countries: [],
  allCountries: [],
  detail: [],
  currentPage: 0,
  status: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
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
    case "GET_COUNTRIES_MATCH": {
      if (action.payload >= 400) {
        return {
          ...state,
          currentPage: 0,
          countries: [],
          status: 404,
        };
      }
      const [countries, status] = action.payload;
      return {
        ...state,
        currentPage: 0,
        countries: countries,
        status: status,
      };
    }
    case "CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case "FILTER_BY_CONTINENT":
      const allCountries = state.allCountries;
      // console.log(allCountries)
      const filterCountries =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((c) => c.continents === action.payload);
      return {
        ...state,
        countries: filterCountries,
      };
    case "ORDER_BY_COUNTRIE":
      let sortedArr =
        action.payload === "A-Z"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
            return {
              ...state,
              countries: sortedArr,
            };
    case "ORDER_BY_POPULATION":
      let sortedP =
        action.payload === "men"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedP,
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
