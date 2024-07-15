const { where } = require("sequelize");
const db = require("../models/index.models.js");
const User = db.user;

const addUser = async (req, res) => {
  // add user using postman
  const addUser = req.body;

  try {
    if (addUser.length > 1) {
      const result = await User.bulkCreate(addUser);
      res
        .status(201)
        .json({ message: "User created successfully", data: result });
    } else {
      const result = await User.create(addUser);
      res
        .status(201)
        .json({ message: "User created successfully", data: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewUsers = async (req, res) => {
  // create find all api
  try {
    const users = await User.findAll();

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  // how i see data while deleting

  try {
    const result = await User.destroy({
      where: {
        id: req.params.id,
      },
      truncate: false,
    });

    if (result > 0) {
      res
        .status(200)
        .json({ message: "User deleted successfully", data: req.params.id });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const [data] = await User.update(updateData, {
      where: {
        id: id,
      },
    });

    if (data > 0) {
      res
        .status(200)
        .json({ message: "User updated successfully", data: updateData });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

module.exports = {
  addUser,
  viewUsers,
  deleteUser,
  updateUser,
  getOneUser,
};
