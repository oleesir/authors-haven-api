module.exports = (sequelize, DataTypes) => {
  const ArticleTags = sequelize.define('ArticleTags', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    articleId: {
      allowNull: false,
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id',
      }
    },
    tagId: {
      allowNull: false,
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Tags',
        key: 'id',
      }
    },
  }, {});
  return ArticleTags;
};
