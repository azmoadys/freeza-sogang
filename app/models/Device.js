/* jshint indent: 2 */
'use strict';

/* Stores only current data. */
module.exports = (sequelize, DataTypes) => {
	var Device = sequelize.define('Device', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		weight: {
			allowNull: false,
			type: DataTypes.FLOAT,
		},
	});
	
	Device.associate = function (models){
		Device.hasMany(models.History, {
			foreignKey: 'device_id',
			as: 'deviceDetails'
		});
	};
	return Device;
}
