module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {
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
    followerId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {});
  Followers.associate = (models) => {
    Followers.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Followers.belongsTo(models.Users, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Followers;
};
