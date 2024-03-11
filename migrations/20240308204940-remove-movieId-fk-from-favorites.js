module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Favorites', 'movieId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Favorites', 'movieId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Movies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }
};
