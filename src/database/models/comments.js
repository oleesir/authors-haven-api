module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
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
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    repliedTo: {
      allowNull: true,
      type: DataTypes.UUID,
    },
  }, {});
  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Comments.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Comments.belongsTo(models.Comments, {
      foreignKey: 'repliedTo',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Comments;
};
