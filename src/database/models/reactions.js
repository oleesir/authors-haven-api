module.exports = (sequelize, DataTypes) => {
  const Reactions = sequelize.define('Reactions', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
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
