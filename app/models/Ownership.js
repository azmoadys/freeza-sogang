/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ownership = sequelize.define('Ownership', {
	  userID: {
		allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      deviceID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      }
  })
  return Ownership;
}
