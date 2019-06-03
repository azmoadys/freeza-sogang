'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
	  id: {
		primaryKey: true,
		allowNull: false,
		type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
		type: Sequelize.UUID,
		references: {
			model: 'Users',
			key: 'id'
		}

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

