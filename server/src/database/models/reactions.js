module.exports = (sequelize, DataTypes) => {
  const Reactions = sequelize.define('Reactions', {
    articleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('like', 'dislike'),
      allowNull: false
    }
  }, {});
  Reactions.associate = (models) => {
    Reactions.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Reactions;
};
