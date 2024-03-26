const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-js", "root", "rahideartisan", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
