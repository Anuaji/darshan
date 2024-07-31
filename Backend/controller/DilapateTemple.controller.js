const dbConfig = require("../database/config");

let dilapidated = {};

dilapidated.createdilapidateTemple = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const { name, description, imageUrl } = req.body;

      const sql = `INSERT INTO dilapatedtemple (name, description,imageUrl) VALUES (?, ?,?)`;
      const values = [name, description, imageUrl];

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("Database error:", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({
            status: 200,
            message: "Temple created successfully",
          });
        }
      });
    } catch (e) {
      console.log("Internal server error:", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

dilapidated.getAlldilapidateTemple = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM dilapatedtemple`;

    dbConfig.query(sql, (err, results) => {
      if (err) {
        console.log("Database error:", err);
        return reject({ status: 500, message: "Error occurred" });
      } else {
        return resolve({ status: 200, data: results });
      }
    });
  });
};

module.exports = dilapidated;
