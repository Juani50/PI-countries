const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name:{
      type: DataTypes.STRING,
      
    },
    dificultad:{
        type: DataTypes.DOUBLE(1, 5),
      
    },
    duracion:{
    type: DataTypes.STRING,
    },
    temporada:{
        type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
    }
    

  });
};
