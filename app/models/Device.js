/* jshint indent: 2 */
'use strict';

/* How to deal with data? update row? or just keep them? */
module.exports = (sequelize, DataTypes) => {
	var Device = sequelize.define('Device', {
		id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		filledAt: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.DATE
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING
		},
		weight: {
			allowNull: false,
			type: DataTypes.FLOAT
		},
	})
	return Device;
}

