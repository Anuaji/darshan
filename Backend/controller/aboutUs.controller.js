const dbConfig = require("../database/config");
require("dotenv").config();

let aboutUsContr = {};

aboutUsContr.getAll = async req => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM about`;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

aboutUsContr.getSingleAbout = async req => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;

      const sql = `SELECT * FROM about WHERE id = ${id}`;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

aboutUsContr.create = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const aboutTitle = req.body.aboutTitle;
      const AboutDescription = req.body.AboutDescription;

      const sql = `INSERT INTO about (aboutTitle,AboutDescription) VALUES ("${aboutTitle}","${AboutDescription}")`;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 404, message: "Not Found" });
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

aboutUsContr.deleteAboutus = async req => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `DELETE FROM about WHERE id="${req.params.id}"`;
      dbConfig.query(sql, (err, result) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 404, message: "Not Found" });
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = aboutUsContr;
