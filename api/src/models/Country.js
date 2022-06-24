const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id:{
    type: DataTypes.STRING(3),
    allowNull: false,
    primaryKey: true
  },
    flags: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continents:{
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false
    },
    
    subregion:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.FLOAT,
    },
    population:{
      type: DataTypes.INTEGER,
    },
  },{timestamps: false});
};
