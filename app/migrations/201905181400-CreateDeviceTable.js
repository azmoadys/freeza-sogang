'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
	  id: {
		allowNull: false,
		type: Sequelize.INTEGER,
      },
      filledAt: {
        allowNull: false,
		primaryKey: true,
        type: Sequelize.DATE
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weight: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Devices');
  }
};
