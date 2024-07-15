module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("firstName");
          return rawValue ? "Hello " + rawValue.toUpperCase() : null;
        },
        set(value) {
          return this.setDataValue("firstName", "Mr " + value);
        },
      },
      lastName: {
        type: DataTypes.STRING,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
    },
    {
      // Other model options go here
      tableName: "users",
    }
  );

  // `sequelize.define` also returns the model
  console.log(User === Sequelize.models.User); // true

  return User;
};
