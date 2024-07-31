// const mysql = require("mysql");
require("dotenv").config();
const mysql = require("mysql2");

var mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected succesfully!..");
  }
});

module.exports = mysqlConnection;
