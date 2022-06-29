import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions";
import Card from "./Card";
import { Link } from "react-router-dom";
import "../stayle/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  return (
    <div>
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

        <div className="container">
          {allCountries?.slice(0, 9).map((e) => (
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
