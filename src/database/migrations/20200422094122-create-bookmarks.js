module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bookmarks', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    articleId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id',
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Bookmarks')
};
