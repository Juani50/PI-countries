import React from "react";
import { Link } from "react-router-dom";
import "../stayle/LandingPage.css";

function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="conteiner3"></div>
      <div className="conteiner2">
        <div className="conteiner">
          <h1 className="titulo">Bienvenidos a mi web Countries</h1>
          <Link to="/home">
            <button class="btn"> Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
