const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("video", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
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

// db.user.hasOne(db.contact, {foreignKey: "userId", as:'Additional Details'});
// db.contactUser = db.contact.belongsTo(db.user, {
//   foreignKey: "userId",
//   as: "users",
// });
// db.user.hasMany(db.contact, { foreignKey: "userId" });

const Grant = sequelize.define(
  "grant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    selfGranted: DataTypes.BOOLEAN,
  },
  { timestamps: false }
);

db.grant = Grant;

db.customer.belongsToMany(db.profile, { through: Grant });
db.profile.belongsToMany(db.customer, { through: Grant });

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

db.sequelize
  .sync({ force: false }) // Use false to preserve data
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing models:", error);
  });

module.exports = db;
