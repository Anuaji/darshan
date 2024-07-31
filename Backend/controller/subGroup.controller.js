const dbConfig = require("../database/config");

let subGroup = {};

subGroup.createSubGroup = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const { groupName, subgroupName } = req.body;

      const sql = `INSERT INTO subgroup (groupName, subgroupName) VALUES (?, ?)`;
      const values = [groupName, subgroupName];

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("Database error:", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({
            status: 200,
            message: "Sub Group created successfully",
          });
        }
      });
    } catch (e) {
      console.log("Internal server error:", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};
subGroup.updateSubGroup = async (req) => {
  const id = req.params.id;

  return new Promise((resolve, reject) => {
    try {
      const { groupName, subgroupName } = req.body;

      const sql = `UPDATE subgroup SET groupName = ?, subgroupName = ? WHERE id = ?`;
      const values = [groupName, subgroupName, id];

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("Database error:", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({
            status: 200,
            message: "Sub Group updated successfully",
          });
        }
      });
    } catch (e) {
      console.log("Internal server error:", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};
subGroup.getAllSubGroups = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM subgroup`;

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
subGroup.deleteSubGroup = async (req) => {
  const id = req.params.id;

  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM subgroup WHERE id = ?`;

    dbConfig.query(sql, [id], (err, results) => {
      if (err) {
        console.log("Database error:", err);
        return reject({ status: 500, message: "Error occurred" });
      } else {
        return resolve({
          status: 200,
          message: "Sub Group deleted successfully",
          data: results,
        });
      }
    });
  });
};

module.exports = subGroup;
