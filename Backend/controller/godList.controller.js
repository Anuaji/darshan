const dbConfig = require("../database/config");
require("dotenv").config();

let godList = {};

godList.create = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const {
        mainGodName,
        description,
        image,
        subGodNames,
        stories,
        selectedFestival,
        selectedMantra,
        selectedPrasad,
        selectedVehicle,
      } = req.body;

      const sql = `
      INSERT INTO godList (
        main_god_name, description, pariharam_image, stories, related_names, festivals, mantras, prasad, vehicles
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      const values = [
        mainGodName,
        description,
        image,
        JSON.stringify(stories),
        JSON.stringify(subGodNames),
        JSON.stringify(selectedFestival),
        JSON.stringify(selectedMantra),
        JSON.stringify(selectedPrasad),
        JSON.stringify(selectedVehicle),
      ];

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

godList.getAll = async (req) => {
  console.log("object");
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM godList";
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

godList.getSingleData = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const sql = `SELECT * FROM godList where id = ${id}`;
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

godList.delete = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const sql = `DELETE FROM godList where id = ${id}`;
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

godList.update = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const id = req.params.id;
      console.log("id :>> ", id);
      const {
        mainGodName,
        description,

        subGodNames,
        stories,
        selectedFestival,
        selectedMantra,
        selectedPrasad,
        selectedVehicle,
        image,
      } = req.body;
      console.log("req.body :>> ", req.body);
      const sql = `
        UPDATE godList SET
          main_god_name = ?,
          description = ?,
          pariharam_image = ?,
          stories = ?,
          related_names = ?,
          festivals = ?,
          mantras = ?,
          prasad = ?,
          vehicles = ?
        WHERE id = ?
      `;

      // Construct values array
      const values = [
        mainGodName,
        description,
        image,
        JSON.stringify(stories),
        JSON.stringify(subGodNames),
        JSON.stringify(selectedFestival),
        JSON.stringify(selectedMantra),
        JSON.stringify(selectedPrasad),
        JSON.stringify(selectedVehicle),
        id,
      ];

      // Execute the query
      dbConfig.query(sql, values, (err, response) => {
        if (err) {
          console.log("Database error:", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({
            status: 200,
            message: "Group updated successfully",
          });
        }
      });
    } catch (e) {
      console.log("Internal server error:", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

module.exports = godList;
