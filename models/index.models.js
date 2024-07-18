const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("video", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
  logging: false,

  // connection pool
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.user = require("./user.models.js")(sequelize, DataTypes);
db.contact = require("./contacts.models.js")(sequelize, DataTypes);
db.userContacts = require("./userContacts.models.js")(
  sequelize,
  DataTypes,
  db.user,
  db.contact
);
db.education = require("./education.models.js")(
  sequelize,
  DataTypes,
  db.user,
  db.contact
);
db.customer = require("./customer.models.js")(sequelize, DataTypes);
db.profile = require("./profile.models.js")(sequelize, DataTypes);
db.comment = require("./comment.models.js")(sequelize, DataTypes, Model);
db.video = require("./video.models.js")(sequelize, DataTypes, Model);
db.image = require("./image.models.js")(sequelize, DataTypes, Model);
db.tag = require("./tag.models.js")(sequelize, DataTypes, Model);
db.tag_taggable = require("./tagable.models.js")(sequelize, DataTypes, Model);

// db.user.hasOne(db.contact, {foreignKey: "userId", as:'Additional Details'});
// db.contactUser = db.contact.belongsTo(db.user, {
//   foreignKey: "userId",
//   as: "users",
// });
// db.user.hasMany(db.contact, { foreignKey: "userId" });

// const Grant = sequelize.define(
//   "grant",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     selfGranted: DataTypes.BOOLEAN,
//   },
//   { timestamps: false }
// );

// db.grant = Grant;

// db.customer.belongsToMany(db.profile, { through: Grant });
// db.profile.belongsToMany(db.customer, { through: Grant });

// // Setup a One-to-Many relationship between User and Grant
// db.customer.hasMany(db.grant);
// db.grant.belongsTo(db.customer);
// // Also setup a One-to-Many relationship between Profile and db.grant
// db.profile.hasMany(db.grant);
// db.grant.belongsTo(db.profile);

// db.education.belongsTo(db.contact, { foreignKey: "contactId" });
// db.contact.hasMany(db.education, { foreignKey: "contactId" });

// db.user.belongsToMany(db.contact, { through: db.userContacts });
// db.contact.belongsToMany(db.user, { through: db.userContacts });

// db.player = sequelize.define("Player", { username: DataTypes.STRING });
// db.team = sequelize.define("Team", { name: DataTypes.STRING });
// db.game = sequelize.define("Game", { name: DataTypes.STRING });

//  db.gameTeam = sequelize.define("GameTeam", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
// });
// db.team.belongsToMany(db.game, { through: db.gameTeam });
// db.game.belongsToMany(db.team, { through: db.gameTeam });
// db.gameTeam.belongsTo(db.game);
// db.gameTeam.belongsTo(db.team);
// db.game.hasMany(db.gameTeam);
// db.team.hasMany(db.gameTeam);

// db.playerGameTeam = sequelize.define('PlayerGameTeam', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
// });
// db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
// db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });
// db.playerGameTeam.belongsTo(db.player);
// db.playerGameTeam.belongsTo(db.gameTeam);
// db.player.hasMany(db.playerGameTeam);
// db.gameTeam.hasMany(db.playerGameTeam);

// db.user.hasMany(db.contact, { as: 'Contacts' });
// db.contact.belongsTo(db.user);

// db.image.hasMany(db.comment, {
//   foreignKey: "commentableId",
//   constraints: false,
//   scope: {
//     commentableType: "image",
//   },
// });
// db.comment.belongsTo(db.image, {
//   foreignKey: "commentableId",
//   constraints: false,
// });

// db.video.hasMany(db.comment, {
//   foreignKey: "commentableId",
//   constraints: false,
//   scope: {
//     commentableType: "video",
//   },
// });
// db.comment.belongsTo(db.video, {
//   foreignKey: "commentableId",
//   constraints: false,
// });

// db.image.belongsToMany(db.tag, {
//   through: {
//     model: db.tag_taggable,
//     unique: false,
//     scope: {
//       taggableType: "image",
//     },
//   },
//   foreignKey: "taggableId",
//   constraints: false,
// });

// db.tag.belongsToMany(db.image, {
//   through: {
//     model: db.tag_taggable,
//     unique: false,
//   },
//   foreignKey: "tagId",
//   constraints: false,
// });

// db.video.belongsToMany(db.tag, {
//   through: {
//     model: db.tag_taggable,
//     unique: false,
//     scope: {
//       taggableType: "video",
//     },
//   },
//   foreignKey: "taggableId",
//   constraints: false,
// });

// db.tag.belongsToMany(db.video, {
//   through: {
//     model: db.tag_taggable,
//     unique: false,
//   },
//   foreignKey: 'tagId',
//   constraints: false,
// });

db.post = sequelize.define(
  "post",
  {
    content: DataTypes.STRING,
  },
  { timestamps: false }
);

db.reaction = sequelize.define(
  "reaction",
  {
    type: DataTypes.STRING,
  },
  { timestamps: false }
);

db.post.hasMany(db.reaction);
db.reaction.belongsTo(db.post);

db.sequelize
  .sync({ force: false }) // Use false to preserve data
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing models:", error);
  });

module.exports = db;
