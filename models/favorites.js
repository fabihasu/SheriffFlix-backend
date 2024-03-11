module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      timestamps: false
    });

    Favorite.associate = function(models) {
        Favorite.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
      });
  };
  
  return Favorite;
}; 