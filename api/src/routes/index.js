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
    const info = await apiUrl.data.map(e => {
        return{
            flags: e.flags,
            name: e.name.official,
            continents: e.continents
        }
    })
    return info;
};

const getDbInfo = async () => {
    return await Country.findAll({
        includes:{
            model: Activity,
            attributes:['name'],
            through:{
                attributes:[],
            }
        }
    })
}

const getAllCountries = async () => {
    const api = await getCountries();
    const dataBase = await getDbInfo();
    const apiDat = api.concat(dataBase)
    return apiDat
}

router.get('/countries', async (req, res) =>{
    const name = req.query.name
    let countriesTotal = await getAllCountries();
    if(name){
        let coutriesName = await countriesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        coutriesName.lenght ?
        res.status(200).send(coutriesName) : 
        res.status(404).send('No se encontro el pais');
    } else{
        res.status(200).send(countriesTotal)
    }
})



module.exports = router;
