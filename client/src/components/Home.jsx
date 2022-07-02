import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  setCurrentPage,
  filterByContinent,
  orderByCountrie,
  orderByPopulation,
  getAllActivities,
  getFilterActivities
} from "../actions";
import Card from "./Card";
import { Link } from "react-router-dom";
import "../stayle/Home.css";
import { SearchBox } from "../components/SearchBar";

const ITEMS_FOR_PAGE = 10;

export default function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.allActivities);
  const [order, setOrder] = useState("");

  if (!allActivities.length) dispatch(getAllActivities())

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const filterCountries = () => {
    if (currentPage === 0) {
      return allCountries.slice(currentPage, currentPage + 9);
    }
    return allCountries.slice(currentPage, currentPage + ITEMS_FOR_PAGE);
  };
  const currentCountries = filterCountries();

  const nextPage = () => {
    currentPage === 0
      ? dispatch(setCurrentPage(currentPage + 9))
      : dispatch(setCurrentPage(currentPage + ITEMS_FOR_PAGE));
  };
  const prevPage = () => {
    if (currentPage === 9) return dispatch(setCurrentPage(currentPage - 9));
    if (currentPage > 0) dispatch(setCurrentPage(currentPage - ITEMS_FOR_PAGE));
  };

  const handleFilterByContinents = (e) => {
    dispatch(filterByContinent(e.target.value));
  };
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByCountrie(e.target.value));
    // console.log(e.target.value)
    // filterCountries(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    // console.log(e.target.value)
    // filterCountries(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
   function handleFilterByActivities(e) {
    e.preventDefault()
    dispatch(getFilterActivities(e.target.value))
}

  return (
    <div className="Home">
      <SearchBox />
      <Link to="/createActivitie">
        <button>Crear actividad</button>
      </Link>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option disabled selected defaultValue>
            Ordenado por...
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select onChange={(e) => handleFilterByContinents(e)}>
          <option value="All">Todos</option>
          <option value="North America">America del Norte</option>
          <option value="South America">America del Sur</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antartida</option>
        </select>
        <select onChange={(e) => handleFilterByActivities(e)}>
          <option value="act">Actividad Turistica</option>
          {allActivities?.map(ac => (
                      <option key={ac.id} value={ac.name}>{ac.name}</option>
                    ))
                  }
        </select>
        <select onChange={(e) => handleSortPopulation(e)}>
          <option disabled selected defaultValue>
            Ordenado por...
          </option>
          <option value="may">Mayor poblacion</option>
          <option value="men">Menor poblacion</option>
        </select>
        <div>
          <button disabled={currentPage === 0} onClick={prevPage}>
            Prev
          </button>
          <button
            disabled={currentCountries.length < 9 || currentPage === 240}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
        <div className="container">
          {currentCountries?.map((e) => (
            <Card
              name={e.name}
              flags={e.flags}
              continents={e.continents}
              key={e.id}
              id={e.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
