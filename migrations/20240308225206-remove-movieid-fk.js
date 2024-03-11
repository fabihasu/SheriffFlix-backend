'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Favorites', 'Favorites_movieId_fkey');
  },

  down: async (queryInterface, Sequelize) => {
  }
};
