module.exports = (sequelize, DataTypes) => {
  const Views = sequelize.define('Views', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {});
  Views.associate = (models) => {
    Views.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Views.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Views;
};
