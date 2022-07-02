const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Country, Activity } = require("../db");
const API_URL = "https://restcountries.com/v3/all";

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getCountries = async () => {
  const apiUrl = await axios.get(API_URL);
  let countryDb = await Country.findAll({
    raw: true,
  });
  if (countryDb.length === 0) {
    const info = await apiUrl.data.forEach(async (e) => {
      await Country.create({
        id: e.cca3,
        flags: e.flags[0],
        name: e.name.common,
        continents: e.continents[0],
        capital: e.capital ? e.capital[0] : "Not found",
        subregion: e.subregion ? e.subregion : "Not found",
        area: e.area,
        population: e.population,
      });
    });
  }
  return countryDb;
};

const getDbInfo = async (apiPais) => {
  const pais = await Country.findAll({
    includes: {
      model: Activity,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return pais.map((e) => {
    return {
      id: e.id,
      flags: e.flags,
      name: e.name,
      continents: e.continents,
      capital: e.capital,
      subregion: e.subregion,
      area: e.area,
      population: e.population,
    };
  });
};

router.get("/countries", async (req, res) => {
  const name = req.query.name;
  let countriesTotal = await getCountries();
  // console.log(countriesTotal[0].name)
  if (name) {
    let coutriesName = countriesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );

    coutriesName.length
      ? res.status(200).send(coutriesName)
      : res.status(404).send("No se encontro el pais");
  } else {
    res.status(200).send(countriesTotal);
  }
});

router.get("/countries/:id", async (req, res) => {
  let { id } = req.params;
  // const dataApi = await axios.get(`https://restcountries.com/v3/alpha/${id}`)
  try {
    let searchForId = await Country.findByPk(id, { include: Activity });
    //   console.log(searchForId)
    res.json(
      searchForId
        ? searchForId
        : `No encontramos ningun pais con que coincida con el ID`
    );
  } catch (error) {
    res.status(404).send(`No se encontro el pais `);
  }
});

router.post("/activities", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    let createActivity = await Activity.findOrCreate({
      where: { name: name },
      defaults: { name, difficulty, duration, season },
    });
    // console.log(createActivity)
    let activitycoutry = await Country.findAll({ where: { id: countries } });
    activitycoutry.map(async (country) => {
      await country.addActivity(createActivity[0].id);
    });
    res.status(200).send("Se agrego la actividad correctamente");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
