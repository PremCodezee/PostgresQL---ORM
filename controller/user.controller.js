const { where } = require("sequelize");
const db = require("../models/index.models.js");
const User = db.user;
const { Sequelize, Op, and } = require("sequelize");
const { QueryTypes } = require("sequelize");

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
};

const gettersAndSetters = async (req, res) => {
  // const data = await User.findAll({
  //   where: {
  //     firstName: {
  //       [Op.like] : 'd%'
  //     }
  //   },
  // });
  // res.status(200).json({ data: data });

  // create
  const data = await User.create({
    firstName: "Naresh",
    lastName: "Kumar",
  });
  res.status(200).json({ data: data });
};

const validateUser = async (req, res) => {
  var data = {};
  var messages = {};
  try {
    data = await User.create({
      firstName: "hadi",
      lastName: "viking",
    });
  } catch (error) {
    error.errors.forEach((err) => {
      let message;
      switch (err.validatorKey) {
        case "isAlpha":
          message = "Only Alphabets Allowed";
          break;
        case "len":
          message = "Length should be between 3 and 10";
          break;
        default:
          message = err.message;
          break;
      }
      messages[err.path] = message;
    });
    res.status(400).json({ messages: messages });
    return;
  }

  res.status(200).json({ messages: "Data Added Successfully", data: data });
};

const rawQueries = async (req, res) => {
  // const users = await db.sequelize.query('SELECT * FROM users', {
  //   type: QueryTypes.SELECT,
  //   model: User,
  //   mapToModel: true,
  //   plain: false
  // });

  // res.status(200).json({ data: users });

  // const users = await db.sequelize.query(
  //   "SELECT * FROM users WHERE id = ?",
  //   {
  //     replacements: ["5"],
  //     type: QueryTypes.SELECT,
  //   }
  // );

  // res.status(200).json({ data: users });


  // const users = await db.sequelize.query(
  //   "SELECT * FROM users WHERE id IN(:id)",
  //   {
  //     replacements: {id: ['1', '3', '5']},
  //     type: QueryTypes.SELECT,
  //   }
  // );

  // res.status(200).json({ data: users });

  // bind
  const users = await db.sequelize.query(
    "SELECT * FROM users WHERE id=$id",
    {
      bind: {id: '1'},
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json({ data: users });
};

const oneToOne = async (req, res) => {
  // const data = await User.create({
  //   firstName: "gungun",
  //   lastName: "sharma",
  // });

  // if (data && data.id){
  //   const contact = await db.contact.create({
  //     permanentAddress: "surat",
  //     currentAddress: "gujarat",
  //     userId: data.id
  //   });

  //   res.status(200).json({ data: data, contact: contact });
  // }

  // findAll
  // const data = await User.findAll({
  //   attributes:['firstName', 'lastName' ],
  //   include: [{
  //     model: db.contact,
  //     as:'Additional Details',
  //     attributes: ['permanentAddress', 'currentAddress']
  //   }],
  //   where: {id: 2} 
  // });


  const data = await db.contact.findAll({
    attributes: ['permanentAddress', 'currentAddress'],    
    include: [{
      model: User,
      as:'Personal Details',
      attributes:['firstName', 'lastName' ],
    }],
    where: {id: 2} 
  });

  res.status(200).json({ data: data });
}

module.exports = {
  addUser,
  viewUsers,
  deleteUser,
  updateUser,
  getOneUser,
  queryMethods,
  queryFinders,
  gettersAndSetters,
  validateUser,
  rawQueries,
  oneToOne  
};
