
module.exports = (Sequelize, DataTypes) => {

const Profile = Sequelize.define(
    'profile',
    {
      name: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return Profile;

} 