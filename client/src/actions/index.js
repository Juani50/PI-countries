import axios from 'axios';

export function getCountries(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/countries")
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        })
    }
}

export function postActivities(payload){
     return async function (dispatch){
        const response = await axios.post("http://localhost:3001/activities", payload)
        return response;
     }
}

export function getDetail(id){
    return async function (dispatch){
        try{
            var {data} = await axios.get("http://localhost:3001/countries/" + id);
            return dispatch({
                type:"GET_DETAILS",
                payload: data,
            })
        } catch(error){
            console.log(error)
        }

    }
}