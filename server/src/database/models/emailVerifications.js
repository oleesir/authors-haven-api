import moment from 'moment';

module.exports = (sequelize, DataTypes) => {
  const EmailVerifications = sequelize.define('EmailVerifications', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresOn: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});
  EmailVerifications.associate = (models) => {
    EmailVerifications.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };

  EmailVerifications.beforeCreate((date) => {
    const fiveMinutesFromNow = moment(date.expiresOn).add(5, 'minutes');

    date.expiresOn = fiveMinutesFromNow;

    return date;
  });


  return EmailVerifications;
};
