const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("video", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
