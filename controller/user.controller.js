const db = require("../models/index.models.js");
const User = db.user;

const addUser = async (req, res) => {
  const jane = await User.create({ firstName: "vin", lastName: "Disel" });

  res.send(jane.toJSON());

  console.log(jane instanceof User); // true
  console.log(jane.firstName, jane.lastName); // "Jane"
};

const viewUsers = async (req, res) => {
  const users = await User.findAll();

  res.send(users);
};

const deleteUser = async (req, res) => {
  const jane = await User.destroy({ where: { firstName: "John" } });
};

const updateUser = async (req, res) => {
  const jane = await User.update(
    { firstName: "vin" },
    { where: { firstName: "Dwayne" } }
  );
};

module.exports = {
  addUser,
  viewUsers,
  deleteUser,
  updateUser,
};
