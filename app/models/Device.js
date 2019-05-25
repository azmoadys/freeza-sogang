/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
	var Device = sequelize.define('Device', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		filledAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING
		},
		weight: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
	})
	return Device;
}

