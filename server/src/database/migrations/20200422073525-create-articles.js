module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
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
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'https://res.cloudinary.com/dhixv0jh9/image/upload/v1590399940/apps.24119.13561428843663101.db53229a-3063-4dd3-b18e-61ad6b3661d1_otde0c.png'
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('draft', 'published'),
      defaultValue: 'draft'
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
  down: (queryInterface) => queryInterface.dropTable('Articles', { cascade: true })
};
