module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      tableName: "users",
    }
  );

  // `sequelize.define` also returns the model
  console.log(User === Sequelize.models.User); // true
};
