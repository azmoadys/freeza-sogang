'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ownerships', {
	  userID: {
		allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      deviceID: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ownerships');
  }
};
