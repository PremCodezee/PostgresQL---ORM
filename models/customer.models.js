
module.exports = (Sequelize, DataTypes) => {

const Customer = Sequelize.define(
  "customer",
  {
    username: DataTypes.STRING,
    points: DataTypes.INTEGER,
  },
  { timestamps: false }
);

return Customer
}