'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ownership', {
	  userID: {
		allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      SID: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ownership');
  }
};
