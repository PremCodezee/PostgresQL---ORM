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
db.userContacts = require("./userContacts.models.js")(sequelize, DataTypes, db.user, db.contact);

// db.user.hasOne(db.contact, {foreignKey: "userId", as:'Additional Details'});
// db.contact.belongsTo(db.user, { foreignKey: "userId", as: "Personal Details" });
// db.user.hasMany(db.contact, { foreignKey: "userId", as: "Additional Details" });

db.user.belongsToMany(db.contact, { through: db.userContacts });
db.contact.belongsToMany(db.user, { through: db.userContacts });

db.sequelize
  .sync({ force: false }) // Use false to preserve data
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing models:", error);
  });

module.exports = db;
