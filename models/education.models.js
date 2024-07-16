
module.exports = (Sequelize, DataTypes) => {
  const Education = Sequelize.define(
    "Education",
    {
      education: {
        type: DataTypes.STRING,
      },
      skills: {
        type: DataTypes.STRING,
      },
    //   userId: DataTypes.INTEGER
    contactId: DataTypes.INTEGER
    },
    {
      tableName: "education",
    }
  );

  return Education;
};
