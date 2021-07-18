'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Animais',
        'dono',
        {
          type: Sequelize.STRING
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Animais',
      'dono'
    );
  }
};
