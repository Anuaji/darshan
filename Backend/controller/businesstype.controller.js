const dbConfig = require("../database/config");

//main_god get all
exports.businesstypeGetAll = (req, res) => {
  try {
    dbConfig.query(
      "SELECT * FROM businesstype ORDER BY type_id ASC",
      (err, rows, field) => {
        if (!err) {
          // console.log(rows,"here");
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};
//get MaingodName for footer Lists
exports.get_typeNameList = (req, res) => {
  try {
    dbConfig.query(
      "SELECT DISTINCT business_type FROM businesstype",
      (err, rows, fileds) => {
        if (!err) {
          res.send(rows);
        }
      }
    );
  } catch (e) {
    throw e;
  }
};
//Count for Total Temples
exports.getCount = (req, res) => {
  try {
    dbConfig.query(
      "SELECT COUNT(id) AS count FROM Temple",
      (err, rows, fields) => {
        if (!err) res.send(rows);
        console.log(res, "COUNT VALUES");
      }
    );
  } catch (e) {
    throw e;
  }
};
//main_god name get One
exports.businesstypeGetOne = (req, res) => {
  console.log(req.params.id);
  dbConfig.query(
    `SELECT * FROM businesstype WHERE type_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Constant Name Create Schema
exports.businesstypeCreate = (req, res) => {
  var business_type = req.body.business_type;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;

  var sql = `INSERT INTO businesstype
    ( business_type, created_by, is_active) VALUES
      ("${business_type}", "${created_by}", "${is_active}")`;
  console.log(sql, "here");
  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("Record Inserted");
    res.send(rows);
  });
};

//main_god  updat
exports.businesstypeUpdate = (req, res) => {
  var id = req.params.id;
  var business_type = req.body.business_type;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;

  var sql = `UPDATE businesstype SET business_name="${business_type}",
                                  created_by ="${created_by}",
                                  is_active ="${is_active}"
   WHERE type_id="${id}" `;
  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("Record Inserted", sql);
    res.send(rows);
  });
};

//Constant name Delete
exports.businesstypeDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM businesstype WHERE type_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
