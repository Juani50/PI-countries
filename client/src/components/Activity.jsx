import React from "react";

export default function Activity({ act })
{
  return (
    <div>
      <h2>Nombre: {act.name}</h2>
      <h2>Dificultad: {act.difficulty}</h2>
      <h2>Duración: {act.duration}</h2>
      <h2>Temporada: {act.season}</h2>
    </div>
  );
}
