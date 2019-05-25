/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('User', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		username: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
		is_admin: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		}
	})
	return User;
}
