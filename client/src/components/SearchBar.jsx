import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountries, getCountriesMatch } from "../actions/index";
import "../stayle/SearchBar.css"

export const SearchBox = () => {
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    country ? dispatch(getCountriesMatch(country)) : dispatch(getCountries());
  }, [country, dispatch]);

  const onChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="textInputWrapper">
      <input
        id="searchInput"
        type="search"
        value={country}
        onChange={onChange}
        placeholder="Search..."
      />
    </div>
  );
};
