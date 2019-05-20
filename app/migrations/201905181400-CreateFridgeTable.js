'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Fridge', {
	  deviceID: {
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		type: Sequelize.INTEGER,
      },
      ownedBy: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ingredient: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Fridge');
  }
};
