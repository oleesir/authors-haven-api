import bcrypt from 'bcrypt';

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'super-admin'),
      defaultValue: 'user',
      allowNull: false
    }
  }, {});

  Users.associate = (models) => {
    Users.hasOne(models.EmailVerifications, {
      foreignKey: 'userId',
    });

    Users.hasMany(models.Articles, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Users.hasMany(models.Followers, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Users.hasMany(models.Followers, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Users.hasMany(models.Views, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Users.hasMany(models.Comments, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Users.hasMany(models.Bookmarks, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  Users.beforeCreate(async (user) => {
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    return user;
  });


  return Users;
};
