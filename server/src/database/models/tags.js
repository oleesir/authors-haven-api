module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {});

  Tags.associate = (models) => {
    Tags.belongsToMany(models.Articles, {
      through: 'ArticleTags',
      foreignKey: 'tagId',
    });
  };
  return Tags;
};
