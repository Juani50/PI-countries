import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import "../stayle/Detail.css";
import Activity from "./Activity";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myCountrie = useSelector((state) => state.detail);
  //   console.log( "hola",myCountrie)
  return (
    <div>
      <Link to="/home">
        <div className="back">
        <button>Volver</button>
        </div>
      </Link>
      {Object.keys(myCountrie).length > 0 ? (
        <div >
          <div className="detail">
            <img
              src={myCountrie.flags}
              alt="img not found"
              width="300px"
              height="200px"
            />
            <h1>{myCountrie.name}</h1>
            <h3>ISO3: {myCountrie.id}</h3>
            <h3>Capital: {myCountrie.capital}</h3>
            <h3>Subregion: {myCountrie.subregion}</h3>
            <h3>Área: {myCountrie.area} km2</h3>
            <h3>Población: {myCountrie.population}</h3>
          </div>
          <div>
            {myCountrie.activities?.map((act) => (
              <Activity key={act.name} act={act} />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
