import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getCountries } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";


export function ActivityCreate() {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.countries);

  const [input, setInput] = useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: "",
    countries: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">Volver</Link>
      <h1>Crea una actividad</h1>
      <form>
        <div>
          <label htmlFor="name">Nombre de actividad: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="difficulty">Dificultad: </label>
          <input
            type="number"
            name="difficulty"
            id="difficulty"
            value={input.difficulty}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </div>
        <div>
          <label htmlFor="duration">Duración: </label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={input.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="season">Temporada: </label>
          <select>
            <option value="ver">Verano</option>
            <option value="oto">Otoño</option>
            <option value="inv">Invierno</option>
            <option value="pri">Primavera</option>
          </select>
        </div>
        <div>
            <label htmlFor="selectCountries">Países: </label>
            <select name="countries" id="selectCountries">
                {activity?.map((e)=>(
                    <option value={e.id}>{e.name}</option>
                ))}
            </select>
        </div>
        <div>
          <button>Crear</button>
        </div>
      </form>
    </div>
  );
}
