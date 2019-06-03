
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Histories', {
		id: {
			primaryKey: true,
			allowNull: false,
			type: Sequelize.INTEGER,
		},
		user_id: {
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
		round: {
			allowNull: false,
			type: Sequelize.INTEGER
		}
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Histories');
  }
};
