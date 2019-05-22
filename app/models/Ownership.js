/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ownership = sequelize.define('Ownership', {
	  userID: {
		allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      SID: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }
  })
  return Ownership;
}
