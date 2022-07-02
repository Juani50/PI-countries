import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}

export function postActivities(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/activities",
      payload
    );
    return dispatch({
      type: "POST_ACTIVITIES",
      payload: response

    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var { data } = await axios.get("http://localhost:3001/countries/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getCountriesMatch(name) {
  return async function (dispatch) {
    try {
      const { data, status } = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      dispatch({ type: "GET_COUNTRIES_MATCH", payload: [data, status] });
    } catch (error) {
      return dispatch({ type: "GET_COUNTRIES_MATCH", payload: 404 });
    }
  };
}
export function setCurrentPage(currentPage) {
  return {
    type: "CURRENT_PAGE",
    payload: currentPage,
  };
}
export function filterByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}
export function orderByCountrie(payload) {
  return {
    type: "ORDER_BY_COUNTRIE",
    payload,
  };
}
export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}
export function getAllActivities(payload) {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:3001/allActivities");
    return dispatch({
      type: "GET_ACTIVITIES",
      payload: data,
    });
  };
}

export function getFilterActivities(nameActivity) {
  return { type: "GET_FILTER_ACTIVITIES", payload: nameActivity };
}
