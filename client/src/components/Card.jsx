import React from "react";
import { Link } from "react-router-dom";
import "../stayle/Card.css"

export default function Card ({ flags, name, continents, id}){
    // console.log(id)
    return(
       <div className="Card">
         <img src={flags} alt="img not found"/>
         <Link to= {`/detail/${id}`}>
         <h3>{name}</h3>
         </Link>
         <h5>{continents}</h5>
       </div>
    
    )
}