import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "../stayle/ActivitiesCreate.css"

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere nombre de actividad";
  }
  if (!input.difficulty) {
    errors.difficulty = "Se requiere dificuldad";
  }
  return errors;
}

export function ActivityCreate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});

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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelect(e) {
    setInput({
      ...input,
      [e.target.name]:
        e.target.name === "countries"
          ? [...input.countries, e.target.value]
          : e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivities(input));
    // console.log(input)
    setInput({
      name: "",
      difficulty: 0,
      duration: "",
      season: "",
      countries: [],
    });
    alert("Actividad creada!");
    history.push("/home")
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="crearAct">
      <Link to="/home">Volver</Link>
      <h1>Crea una actividad</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Nombre de actividad: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
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
          <select
            name="season"
            id="selectSeason"
            onChange={(e) => handleSelect(e)}
          >
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>
        <div>
          <label htmlFor="selectCountries">Países: </label>
          <select
            name="countries"
            id="selectCountries"
            onChange={(e) => handleSelect(e)}
          >
            {activity?.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <ul>
            <li>{input.countries.map((e) => e + ", ")}</li>
          </ul>
          <button>Crear</button>
        </div>
      </form>
    </div>
  );
}
