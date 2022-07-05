import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "../stayle/ActivitiesCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere nombre de actividad";
  }
  if (!input.difficulty) {
    errors.difficulty = "Se requiere dificuldad";
  }
  if (!input.season) {
    errors.season = "se requiere una temporada";
  }
  if (!input.countries) {
    errors.countries = "Se requiere un país";
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
    if (!input.countries.includes(e.target.value)) {
      setInput({
        ...input,
        [e.target.name]:
          e.target.name === "countries"
            ? [...input.countries, e.target.value]
            : e.target.value,
      });
      return;
    }
    alert("No se pueden repetir los países");
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
    history.push("/home");
  }
  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter((cou) => cou !== el),
    });
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function activateButton(input) {
    if (
      input.name &&
      input.difficulty &&
      input.duration &&
      input.season &&
      input.countries.length > 0
    ) {
      return false;
    }
    return true;
  }

  return (
    <div className="crearAct">
      <Link to="/home">Volver</Link>
      <h1 className="tituloact">Crea una actividad</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="tituloact" htmlFor="name">
            Nombre de actividad:{" "}
          </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label className="tituloact" htmlFor="difficulty">
            Dificultad (De 1 a 5):{" "}
          </label>
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
          <label className="tituloact" htmlFor="duration">
            Duración (Formato 24hs):{" "}
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={input.duration}
            onChange={handleChange}
            min="1"
            max="24"
          />
        </div>
        <div>
          <label className="tituloact" htmlFor="season">
            Temporada:{" "}
          </label>
          <select
            name="season"
            id="selectSeason"
            onChange={(e) => handleSelect(e)}
          >
            <option disabled selected defaultValue>
              Seleccionar
            </option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          {errors.season && <p className="error">{errors.season}</p>}
        </div>
        <div>
          <label className="tituloact" htmlFor="selectCountries">
            Países:{" "}
          </label>
          <select
            name="countries"
            id="selectCountries"
            onChange={(e) => handleSelect(e)}
          >
            <option disabled selected defaultValue>
              Seleccionar
            </option>
            {activity?.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="divX">
            {input.countries.map((e) => (
              <div className="divX2">
                <p>{e}</p>
                <button className="botonX" onClick={() => handleDelete(e)}>
                  x
                </button>
              </div>
            ))}
          </div>

          <div className="box2">
            <button disabled={activateButton(input)} className="box">
              <span>Crear actividad!</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
