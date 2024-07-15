const { where } = require("sequelize");
const db = require("../models/index.models.js");
const User = db.user;
const { Sequelize, Op, and } = require("sequelize");

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

const queryMethods = async (req, res) => {
  // Insert query
  // const user = await User.create(
  //   {
  //     firstName: "alice",
  //     lastName: 'WonderLand',
  //   },
  //   { fields: ["firstName"] }
  // );
  // create bulk
  // await User.bulkCreate(
  //   [{ username: "foo" }, { username: "bar", admin: true }],
  //   {
  //     fields: ["username"],
  //   }
  // );

  // Neither foo nor bar are admins.

  // Find Query
  // const user = await User.findAll({
  //   attributes: ["id", "firstName"],
  // });
  // Find Query (Renamed Attribute AS Method)
  // const user = await User.findAll({
  //   attributes: [["id", "RollNo"], ["firstName", "fName"]],
  // });
  // Find Query (Renamed Attribute AS Method) Count with Aggreation
  // const data = await User.findAll({
  //   attributes: [
  //     "firstName",
  //     [Sequelize.fn("COUNT", Sequelize.col("firstName")), "count"]
  //   ],
  //   group: ["firstName"],
  // });
  // res.status(200).json({ data: data });
  // use exclude, include
  // const data = await User.findAll({
  //   attributes:{
  //     // exclude: ['firstName']
  //     // include: ['firstName']
  //   },
  // });
  // res.status(200).json({ data: data });
  // where clauses
  // const data = await User.findAll({
  // where: {
  // id: {
  //   [Op.eq]: 18,
  // },
  // },
  // where: {
  //   [Op.and]: [{ id: 18 }, { firstName: "Harry" }],
  // },
  // where: {
  //   [Op.or]: [{ id: 18 }, { id: 20 }],
  // },
  // these all are where clauses you learn in postgres
  // });
  // res.status(200).json({ data: data });

  // delete clause
  // Delete everyone named "Jane"
  // await User.destroy({
  //   where: {
  //     firstName: 'Jane',
  //   },
  // });

  // await User.destroy({
  //   truncate: true,
  // });
  // truncate: true, // truncate true means all data got deleted

  // update clause
  // Change everyone without a last name to "Doe"
  // await User.update(
  //   { lastName: "Doe" },
  //   {
  //     where: {
  //       lastName: null,
  //     },
  //   }
  // );

  // create in bulk
  // const captains = await Captain.bulkCreate([{ name: 'Jack Sparrow' }, { name: 'Davy Jones' }]);

  // order by
  // const data = await User.findAll({
  //   order: [
  //     ['firstName', 'ASC'],
  //   ],
  //   group: "id"
  // });
  // res.status(200).json({ data: data });

  // limit
  // const data = await User.findAll({
  //   limit: 2,
  //   offset: 1
  // });
  // res.status(200).json({ data: data });

  // count
  // 1st Method
  // const data = await User.count();
  // res.status(200).json({ data: data });

  // 2nd Method
  // const data = await User.count({
  //   where: {
  //     id: {
  //       [Op.gt]: 15,
  //     },
  //   },
  // });
  // res.status(200).json({ data: data });
};

const queryFinders = async (req, res) => {
  // const data = await User.findAll({
  // const data = await User.findOne({
  //   where: {
  //     firstName: {
  //       [Op.eq]: "Harry",
  //     },
  //   },
  // });
  // res.status(200).json({ data: data });

  // find by pk
  // const data = await User.findByPk(18);
  // res.status(200).json({ data: data });

  // find and create
  // const data = await User.findOrCreate({
  //   where: {
  //     firstName: "Harry",
  //   },
  //   defaults: {
  //     firstName: "Gal",
  //     lastName: "Gadoth",
  //   },
  // });
  // res.status(200).json({ data: data });

  // find and count
  // const data = await User.findAndCountAll({
  //   where: {
  //     firstName: {
  //       [Op.like] : 'd%'
  //     }
  //   },
  // });
  // res.status(200).json({ data: data });


}

module.exports = {
  addUser,
  viewUsers,
  deleteUser,
  updateUser,
  getOneUser,
  queryMethods,
  queryFinders
};
