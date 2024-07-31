const dbConfig = require("../database/config");

//festival get all
exports.festivalGetAll = (req, res) => {
  dbConfig.query(
    "SELECT * FROM festival ORDER BY festival_id DESC",
    (err, rows, field) => {
      if (!err) {
        // console.log(rows, "here");
        res.send(rows);
      } else console.log(err);
    });
};

//festival name get One
exports.festivalGetOne = (req, res) => {
  dbConfig.query(
    `SELECT * FROM festival WHERE festival_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Constant Name Create Schema
exports.festivalCreate = (req, res) => {
  var festival_name = req.body.festival_name;

  var sql = `INSERT INTO festival (festival_name) VALUES ("${festival_name}")`;
  console.log(sql, "here");
  dbConfig.query(sql, function (err, rows, result) {
    if (err !== null) {
      res.status(500).json({ error: "save failed", err: err });
    } else {
      res.status(201).json(rows);
    };
  });
};

//festival  update
exports.festivalUpdate = (req, res) => {
  var id = req.params.id;
  var festival_name = req.body.festival_name;
  // var created_by = req.body.created_by || 0;
  // var is_active = req.body.is_active || 0;

  // var sql = `UPDATE festival SET festival_name="${festival_name}",                   
  //                                 created_by ="${created_by}",
  //                                 is_active ="${is_active}"
  //  WHERE festival_id="${id}" `;
  var sql = `UPDATE festival SET festival_name="${festival_name}" WHERE festival_id="${id}" `;
  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    // console.log("Record Inserted", sql);
    res.send(rows);
  });
};

//Constant name Delete
exports.festivalDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM festival WHERE festival_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
