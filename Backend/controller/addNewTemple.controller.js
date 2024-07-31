const dbConfig = require("../database/config");

let addNewTemple = {};

addNewTemple.createAddnewTemple = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const mainGodName = req.body.mainGodName;
      const subGodName = req.body.subGodName;
      const description = req.body.description;
      const story = req.body.story;

      const sql = `
      INSERT INTO addNewTemple 
      ( mainGodName, subGodName, description, story) 
      VALUES (?, ?, ?, ?)
    `;

      const values = [
        
        mainGodName,
        subGodName,
        description,
        story,
      ];
      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("Database error:", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({
            status: 200,
            message: "Add New Temple Created",
          });
        }
      });
    } catch (e) {
      console.log("Internal server error:", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};



addNewTemple.updateAddnewTemple = async (req) => {
  const id = req.params.id;

  return new Promise((resolve, reject) => {
    try {
      const { mainGodName, subGodName, description, story } = req.body;

      const sql = `UPDATE addNewTemple SET mainGodName = ?, subGodName = ?, description = ?, story = ? WHERE addNewTempleId = ?`;
          const values = [mainGodName, subGodName, description, story, id];
      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("Database error:", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({
            status: 200,
            message: "Add New Temple updated successfully",
          });
        }
      });
    } catch (e) {
      console.log("Internal server error:", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

addNewTemple.getAllAdddnewTemple = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM addNewTemple`;

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

addNewTemple.getbyIdAdddnewTemple = async (req) => {
  const id = req.params.id;

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM addNewTemple WHERE addNewTempleId = ?';

    dbConfig.query(sql,[id], (err, results) => {
      if (err) {
        console.log("Database error:", err);
        return reject({ status: 500, message: "Error occurred" });
      } else {
        return resolve({ status: 200, data: results });
      }
    });
  });
};

addNewTemple.deleteAdddnewTemple = async (req) => {
  const id = req.params.id;

  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM addNewTemple WHERE addNewTempleId = ?`;

    dbConfig.query(sql, [id], (err, results) => {
      if (err) {
        console.log("Database error:", err);
        return reject({ status: 500, message: "Error occurred" });
      } else {
        return resolve({
          status: 200,
          message: "deleted successfully",
          data: results,
        });
      }
    });
  });
};

module.exports = addNewTemple;
