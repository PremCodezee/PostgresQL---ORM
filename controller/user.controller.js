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
  const users = await db.sequelize.query("SELECT * FROM users WHERE id=$id", {
    bind: { id: "1" },
    type: QueryTypes.SELECT,
  });

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
    attributes: ["permanentAddress", "currentAddress"],
    include: [
      {
        model: User,
        // as: "Personal Details",
        attributes: ["firstName", "lastName"],
      },
    ],
    where: { id: 2 },
  });

  res.status(200).json({ data: data });
};

const oneToMany = async (req, res) => {
  // const contact = await db.contact.create({
  //   permanentAddress: "mereth",
  //   currentAddress: "gurugram",
  //   userId: 1,
  // });

  // res.status(200).json({ contact: contact });

  //   const data = await User.findAll({
  //   attributes:['firstName', 'lastName' ],
  //   include: [{
  //     model: db.contact,
  //     as:'Additional Details',
  //     attributes: ['permanentAddress', 'currentAddress']
  //   }],
  // });

  const data = await db.contact.findAll({
    attributes: ["permanentAddress", "currentAddress"],
    include: [
      {
        model: User,
        // as: "Personal Details",
        attributes: ["firstName", "lastName"],
      },
    ],
  });

  res.status(200).json({ data: data });
};

const manyToMany = async (req, res) => {
  //  const data = await User.create({
  //   firstName: "manoj",
  //   lastName: "gupta",
  // });

  // if (data && data.id){
  //   const contact = await db.contact.create({
  //     permanentAddress: "up",
  //     currentAddress: "india",
  //   });

  //   res.status(200).json({ data: data, contact: contact });
  // }

  const data = await db.contact.findAll({
    attributes: ["permanentAddress", "currentAddress"],
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },
    ],
  });

  // res.status(200).json({ data: data });

  // try {
  //   // Create User and Contact
  //   const user = await db.user.create({ firstName: "nupur", lastName: "kapoor" });
  //   const contact = await db.contact.create({ permanentAddress: "haryana", currentAddress: "panipat" });

  //   // Associate User with Contact
  //   await user.addContact(contact);

  //   res.status(200).json({ user: user, contact: contact });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};

const paranoid = async (req, res) => {
  // soft delete and force
  // const data = await User.destroy({
  //   where: {
  //     id: 2
  //   },
  //   // force: true // force true does hard delete
  // });
  // res.status(200).json({ data: data });
  // restore from soft delete
  // const data = await User.restore({
  //   where: {
  //     id: 2
  //   },
  // });
  // res.status(200).json({ data: data });
  // shows data that are soft deleted
  // const data = await User.findAll({
  //   where: {
  //     id: 2
  //    paranoid: false // for all data
  //   },
  //   paranoid: false
  // });
  // res.status(200).json({ data: data });
};

const loading = async (req, res) => {
  //   const data = await User.create({
  //   firstName: "mary",
  //   lastName: "kom",
  // });

  // if (data && data.id){
  //   const contact = await db.contact.create({
  //     permanentAddress: "manipur",
  //     currentAddress: "uttrakand",
  //     userId: data.id
  //   });

  //   res.status(200).json({ data: data, contact: contact });
  // }

  const data = await User.findAll({
    where: {
      id: 2,
    },
    include: db.contact,
  });

  res.status(200).json({ data: data });
};

const advancedEager = async (req, res) => {
  const data = await User.findAll({
    // include: [{
    //   model: db.contact,
    //   // required: true // req: true means ' INNER JOIN ' without require : ' LEFT JOIN '
    //   // required: false, // this is manadate for 'RIGHT JOIN'
    //   // right:true // this is manadate for 'RIGHT JOIN'
    // }, {
    //   model: db.education,
    // }]

    // include: {all: true} // use this for all and all data comes from ' LEFT JOIN '

    // nested eager loading
    include: [
      {
        model: db.contact,
        include: [
          {
            model: db.education,
            where: {
              id: 2,
            },
          },
          {
            where: {
              id: 2,
            },
          },
        ],
      },
    ],

    // include: {all: true, nested: true} // nested keyword includes all nested tables
  });

  res.status(200).json({ data: data });
};

const association = async (req, res) => {
  const data = await db.contact.bulkCreate(
    [
      // you can also do bulk create
      {
        permanentAddress: "pune",
        currentAddress: "maharastra",
        users: {
          firstName: "yashraj",
          lastName: "devle",
        },
      },
      {
        permanentAddress: "nagpur",
        currentAddress: "maharastra",
        users: {
          firstName: "sonu",
          lastName: "pandit",
        },
      },
    ],
    {
      include: [db.contactUser],
    }
  );

  res.status(200).json({ data: data });
};

const advanceMNAssociation = async (req, res) => {
  // const amidala = await db.customer.create({ username: "p4dm3", points: 1000 });
  // const queen = await db.profile.create({ name: "Queen" });
  // await amidala.addProfile(queen, { through: { selfGranted: false } });
  // const result = await db.customer.findOne({
  //   where: { username: "p4dm3" },
  //   include: db.profile,
  // });
  // res.status(200).json({ data: result });

  // const amidala = await db.customer.create(
  //   {
  //     username: 'p4dm3',
  //     points: 1000,
  //     profiles: [
  //       {
  //         name: 'Queen',
  //         grant: {
  //           selfGranted: true,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     include: db.profile,
  //   },
  // );

  // res.status(200).json({ data: amidala });

  // const result = await db.customer.findOne({
  //   where: { username: "p4dm3" },
  //   include: db.profile,
  // });

  // Although you can emulate those with nested includes, as follows:
  // const data = await db.customer.findAll({
  //   include: {
  //     model: db.grant,
  //     include: db.profile,
  //   },
  // });
  // res.status(200).json({ data: data });

  const data = await db.customer.findOne({
    include: {
      model: db.profile,
      through: {
        attributes: ["selfGranted", "id"],
      },
    },
  });

  res.status(200).json({ data: data });
};

const manyToManyToMany = async (req, res) => {
  await db.player.bulkCreate([
    { username: "s0me0ne" },
    { username: "empty" },
    { username: "greenhead" },
    { username: "not_spock" },
    { username: "bowl_of_petunias" },
  ]);
  await db.game.bulkCreate([
    { name: "The Big Clash" },
    { name: "Winter Showdown" },
    { name: "Summer Beatdown" },
  ]);
  await db.team.bulkCreate([
    { name: "The Martians" },
    { name: "The Earthlings" },
    { name: "The Plutonians" },
  ]);
  await db.gameTeam.bulkCreate([
    { GameId: 1, TeamId: 1 },
    { GameId: 1, TeamId: 2 },
    { GameId: 2, TeamId: 1 },
    { GameId: 2, TeamId: 3 },
    { GameId: 3, TeamId: 2 },
    { GameId: 3, TeamId: 3 },
  ]);
  await db.playerGameTeam.bulkCreate([
    { PlayerId: 1, GameTeamId: 3 },
    { PlayerId: 3, GameTeamId: 3 },
    { PlayerId: 4, GameTeamId: 4 },
    { PlayerId: 5, GameTeamId: 4 },
  ]);

  const game = await db.game.findOne({
    where: {
      name: "Winter Showdown",
    },
    include: {
      model: db.gameTeam,
      include: [
        {
          model: db.player,
          through: { attributes: [] }, // Hide unwanted `PlayerGameTeam` nested object from results
        },
        db.team,
      ],
    },
  });
  res.status(200).json({ data: game });
};

const associationScopes = async (req, res) => {
  //   // const user = await User.create(
  //   //   {
  //   //     firstName: "john",
  //   //     lastName: "doe",
  //   //     status: 1,
  //   //     Contacts: [
  //   //       {
  //   //         permanentAddress: "123 Main St",
  //   //         currentAddress: "456 Main St",
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     include: [{ model: db.contact, as: "Contacts" }],
  //   //   }
  //   // );
  //   // res.status(200).json({ data: user });
  //   User.addScope("checkStatus", {
  //     where: {
  //       status: 1,
  //     },
  //   });
  //   User.addScope("checkId", {
  //     where: {
  //       id: 1,
  //     },
  //   });
  //   User.addScope("includeContact", {
  //     include:{
  //        model: db.contact, as: "Contacts" ,
  //        attributes: ["currentAddress"] ,
  //     },
  //   });
  //   User.addScope("firstNameOnlyFromUser", {
  //     attributes: ["firstName"],
  //   });
  //   User.addScope("limit", {
  //     limit: 1,
  //   });
  //   const user = await User.scope(["includeContact", "firstNameOnlyFromUser", 'limit']).findAll({
  //     where: {
  //       id: 1,
  //     },
  //   });
  //   res.status(200).json({ data: user });
};

const transactions = async (req, res) => {
  // const t = await db.sequelize.transaction();

  // const data = await User.create({
  //   firstName: "megha",
  //   lastName: "big dreams",
  // });
  // if (data && data.id) {
  //   try {
  //     await db.contact.create({
  //       permanentAddress: "myhome society",
  //       currentAddress: "surat St",
  //       userId: data.id,
  //     });

  //     await t.commit();
  //     console.log('Commit');
  //   } catch (error) {
  //     await t.rollback();
  //     await User.destroy({
  //       where: {
  //         id: data.id,
  //       },
  //     })
  //     console.log('Rollback');
  //   }
  // }
  // res.status(200).json({ data: data });

  // const data = await User.findAll({
  //   include: [{ model: db.contact, as: "Contacts" }],
  // })

  // res.status(200).json({ data: data });

  // const data = await db.sequelize.transaction(async (t) => {
  //   const user = await User.create(
  //     {
  //       firstName: "john",
  //       lastName: "doe",
  //       status: 1,
  //       Contacts: [
  //         {
  //           permanentAddress: "123 Main St",
  //           currentAddress: "456 Main St",
  //         },
  //       ],
  //     },
  //     {
  //       include: [{ model: db.contact, as: "Contacts" }],
  //       transaction: t,
  //     }
  //   );

  //   if (user && user.id) {
  //     try {
  //       await db.contact.create(
  //         {
  //           permanentAddress: "123 Main St",
  //           currentAddress: "456 Main St",
  //           userId: user.id,
  //         },
  //         {
  //           transaction: t,
  //         }
  //       );

  //       await t.commit();
  //     } catch (error) {
  //       await t.rollback();
  //     }
  //   }
  // });

  // const data = await User.create({ firstName: "bjron", lastName: "ragner" });

  // try {
  //   const result = await db.sequelize.transaction(async (t) => {
  //     const contact = await Contact.create(
  //       {
  //         permanent_address: "lanagrate",
  //         current_address: "norway",
  //         UserId: null,
  //       },
  //       { transaction: t }
  //     );
  //     return contact;
  //   });

  //   console.log("result " + result);
  // } catch (error) {
  //   console.log("error: " + error);
  // await User.destroy({
  //   where: {
  //     id: data.id
  //   }
  // })
  //   })
  // }

  // res.status(200).json({ data: data });

  const data = await User.create({ firstName: "horik", lastName: "viking" });

  try {
    const result = await db.sequelize.transaction(async (t) => {
      if (data && data.id) {
        const contact = await db.contact.bulkCreate(
          [
            {
              permanentAddress: "norwaay",
              currentAddress: "galot",
              userId: null,
            },
            {
              permanentAddress: "mumbai",
              currentAddress: "juhu",
              userId: data.id,
            },
          ],
          { transaction: t }
        );

        return contact;
      } else {
        throw new Error("User ID is null or undefined");
      }
    });

    console.log("result ", result);
    res.status(200).json({ data: data, contacts: result });
  } catch (error) {
    console.log("error: ", error);
    if (data && data.id) {
      await User.destroy({
        where: {
          id: data.id,
        },
      });
    }

    res
      .status(500)
      .json({ message: "Error creating user and contacts", error });
  }
};

const hooks = async (req, res) => {
  const data = await User.create({ firstName: "mami", lastName: "home" });
  // const data = await User.findAll({});

  res.status(200).json({ data: data });
};

const polymorphicAssociations = async (req, res) => {
  // var imageData = await db.image.create({
  //   title: "image 3",
  //   url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  // });
  // var videoData = await db.video.create({
  //   title: "video 3",
  //   text: "learn this 3",
  // });
  // if (imageData && imageData.id) {
  //   await db.comment.create({
  //     title: "comment 3",
  //     commentableId: imageData.id,
  //     commentableType: "image",
  //   });
  // }
  // if (videoData && videoData.id) {
  //   await db.comment.create({
  //     title: "comment 3",
  //     commentableId: videoData.id,
  //     commentableType: "video",
  //   });
  // }
  // res.status(200).json({video: videoData});
  // res.status(200).json({image: imageData});
  // fetching data
  // comment in image
  // const data = await db.image.findAll({
  //   include: [{ model: db.comment }],
  // });
  // res.status(200).json({ data: data });
  // comment in video
  // const data = await db.video.findAll({
  //   include: [{ model: db.comment }],
  // });
  // res.status(200).json({ data: data });
  // video comment
  // const data = await db.comment.findAll({
  //   include: [{ model: db.video }],
  // });
  // res.status(200).json({ data: data });
  //image comment
  // const data = await db.comment.findAll({
  //   include: [{ model: db.image }],
  // });
  // res.status(200).json({ data: data });
};

const manyToManyPolymorphicAssociations = async (req, res) => {
  // var imageData = await db.image.create({
  //   title: "varu",
  //   url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  // });
  // var videoData = await db.video.create({
  //   title: "charu",
  //   text: "laru",
  // });
  // var tagData = await db.tag.create({
  //   name: "tag mo ma lavu",
  // });
  // if (tagData && tagData.id && imageData && imageData.id) {
  //   await db.tag_taggable.create({
  //     tagId: tagData.id,
  //     taggableId: imageData.id,
  //     taggableType: "image",
  //   });
  // }
  // if (tagData && tagData.id && videoData && videoData.id) {
  //   await db.tag_taggable.create({
  //     tagId: tagData.id,
  //     taggableId: videoData.id,
  //     taggableType: "video",
  //   });
  // }
  // res.status(200).json({ image: imageData, video: videoData,  tag: tagData });
  // fetching data
  // const data = await db.image.findAll({
  //   include: [{ model: db.tag}],
  // })
  // const data = await db.video.findAll({
  //   include: [{ model: db.tag}],
  // })
  // const data = await db.tag.findAll({
  //   include: [db.image, db.video],
  // });
  // res.status(200).json({ data: data });
};

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
  oneToOne,
  oneToMany,
  manyToMany,
  paranoid,
  loading,
  advancedEager,
  association,
  advanceMNAssociation,
  manyToManyToMany,
  associationScopes,
  transactions,
  hooks,
  polymorphicAssociations,
  manyToManyPolymorphicAssociations,
};
