const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_tutorial",
  password: "root",
});

module.exports = pool.promise();
