module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      publishDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {}
  );
  Book.associate = (models) => {
    Book.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Book;
};
