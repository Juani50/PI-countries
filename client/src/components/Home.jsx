import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions";
import Card from "./Card";
import { Link } from "react-router-dom";
import "../stayle/Home.css";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, sercountriesPerPage] = useState(10);
  const indexOfLastCountrie = currentPage * countriesPerPage;
  const indexOfFirstcountrie = indexOfLastCountrie - countriesPerPage;
  const currentCountrie = allCountries.slice(
    indexOfFirstcountrie,
    indexOfLastCountrie
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  return (
    <div className="Home">
      <Link to="/createActivitie">
        <button>Crear actividad</button>
      </Link>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="america">America</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europa">Europa</option>
          <option value="oceania">Oceania</option>
          <option value="antanrtida">Antartida</option>
        </select>
        <select>
          <option value="act">Actividad Turistica</option>
        </select>
        <select>
          <option value="may">Mayor poblacion</option>
          <option value="men">Menor poblacion</option>
        </select>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
        <div className="container">
          {currentCountrie?.map((e) => (
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
