const { response } = require("express");
const dbConfig = require("../database/config");
require("dotenv").config();

let group = {};

group.create = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const { group_name } = req.body;

      const sql = `INSERT INTO grouptable (group_name) VALUES (?)`;
      const values = [group_name];

      dbConfig.query(sql, values, (err, response) => {
        if (err) {
          console.log("Database error:", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({
            status: 200,
            message: "Group created successfully",
          });
        }
      });
    } catch (e) {
      console.log("Internal server error:", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

group.getAll = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM grouptable";
      dbConfig.query(sql, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

group.getSingleData = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const sql = `SELECT * FROM grouptable where id = ${id}`;
      dbConfig.query(sql, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

group.delete = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const sql = `DELETE FROM grouptable where id = ${id}`;
      dbConfig.query(sql, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = group;
