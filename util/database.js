const mySql = require("mysql2");

const pool = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "rahideartisan",
  database: "node-js",
});

module.exports = pool.promise();
