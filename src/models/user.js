module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {}
  );
  User.associate = (models) => {
    User.hasMany(models.Book);
  };
  return User;
};
