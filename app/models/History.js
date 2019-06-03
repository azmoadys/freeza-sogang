/* jshint indent: 2 */
'use strict';

/* Stores history. */
module.exports = (sequelize, DataTypes) => {
	var History = sequelize.define('History', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING
		},
		weight: {
			allowNull: false,
			type: DataTypes.FLOAT
		},
	});
	return History;
}
