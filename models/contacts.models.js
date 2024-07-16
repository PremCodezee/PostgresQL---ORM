
module.exports = (Sequelize, DataTypes) => {
  const Contact = Sequelize.define(
    "Contact",
    {
      permanentAddress: {
        type: DataTypes.STRING,
      },
      currentAddress: {
        type: DataTypes.STRING,
      },
      userId: DataTypes.INTEGER
    },
    {
      // Other model options go here
      tableName: "contacts",
    }
  );

  // `sequelize.define` also returns the model
  console.log(Contact === Sequelize.models.Contact); // true

  return Contact;
};
