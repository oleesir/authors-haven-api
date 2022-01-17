module.exports = (sequelize, DataTypes) => {
	const Articles = sequelize.define(
		'Articles',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			avatar: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			body: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('draft', 'published'),
				defaultValue: 'draft',
				allowNull: false,
			},
		},
		{},
	);
	Articles.associate = (models) => {
		Articles.hasMany(models.Reactions, {
			foreignKey: 'articleId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		Articles.hasMany(models.Bookmarks, {
			foreignKey: 'articleId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		Articles.hasMany(models.Comments, {
			foreignKey: 'articleId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		Articles.hasMany(models.Views, {
			foreignKey: 'articleId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		Articles.belongsToMany(models.Tags, {
			through: 'ArticleTags',
			foreignKey: 'articleId',
		});
		Articles.belongsTo(models.Users, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};
	return Articles;
};
