const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Country, Activity} = require ('../db')
const API_URL = "https://restcountries.com/v3/all"

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getCountries = async () => {
    const apiUrl = await axios.get(API_URL);
    // const info = await apiUrl.data.map(e => {
    //     return{
    //         id: e.cca3,
    //         flags: e.flags[0],
    //         name: e.name.common,
    //         continents: e.continents[0],
    //         capital: e.capital ? e.capital[0] : 'Not found',
    //         subregion: e.subregion,
    //         area: e.area,
    //         population: e.population
    //     }
      
    
    // })
    // await Country.bulkCreate(info)
    // return info
    const info = await apiUrl.data.forEach(async e => {
        await Country.findOrCreate({
            where:{
                id: e.cca3,
                flags: e.flags[0],
                name: e.name.common,
                continents: e.continents[0],
                capital: e.capital ? e.capital[0] : 'Not found',
                subregion: e.subregion ? e.subregion :'Not found',
                area: e.area,
                population: e.population
            }
        })
            
    
    })
   let countryDb = await Country.findAll()
   return countryDb
    }

    
    


const getDbInfo = async (apiPais) => {
    const pais = await Country.findAll({
        includes:{
            model: Activity,
            attributes:['name'],
            through:{
                attributes:[],
            }
        }
    })
    return pais.map(e => { 
        return{
        id: e.id,
        flags: e.flags,
        name: e.name,
        continents: e.continents,
        capital: e.capital,
        subregion: e.subregion,
        area: e.area,
        population: e.population}})
}

const getAllCountries = async () => {
    const api = await getCountries();
    // const dataBase = await getDbInfo(api);
    // const apiDat = [...dataBase, ...api]
    return api
}

router.get('/countries', async (req, res) =>{
    const name = req.query.name
    let countriesTotal = await getAllCountries();
    // console.log(countriesTotal[0].name)
    if(name){
        let coutriesName = countriesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        
        coutriesName.length ?
        res.status(200).send(coutriesName) : 
        res.status(404).send('No se encontro el pais');
    } else{
        res.status(200).send(countriesTotal)
        
    }
})

 router.get('countries/:id', async (req, res) => {
    try {
      const idpais = req.params.idPais.toUpperCase();
      // console.log(idpais)
      const country = await Country.findOne({
        where: {
          id: idpais,
        },
        include: Activity,
      });
  
      return res.json(country);
    } catch (error) {
      res.send(error);
    }
  })
  




module.exports = router;