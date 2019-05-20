/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Fridge = sequelize.define('Fridge', {
	  deviceID: {
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true,
		  type: DataTypes.INTEGER,
	  },
	  ownedBy: {
		  allowNull: false,
		  type: DataTypes.UUID,
		  defaultValue: DataTypes.UUIDV4,
	  },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      ingredient: {
        allowNull: false,
        type: DataTypes.STRING
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
  })
  return Fridge;
}

