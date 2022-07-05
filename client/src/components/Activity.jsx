import React from "react";
import "../stayle/Activity.css"

export default function Activity({ act })
{
  return (
    <div className="actcree">
      <h4>Nombre: {act.name}</h4>
      <h4>Dificultad: {act.difficulty}</h4>
      <h4>Duración: {act.duration}</h4>
      <h4>Temporada: {act.season}</h4>
    </div>
  );
}
