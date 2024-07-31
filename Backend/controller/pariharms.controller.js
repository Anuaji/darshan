const dbConfig = require("../database/config");

//getallBlogs
exports.pariharamsGetAll = (req, res) => {
  try {
    dbConfig.query(
      `SELECT pariharam_id, pariharam_name
        FROM pariharams ORDER BY pariharam_id DESC`,
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
          // console.log(rows, "rows");
        } else {
          console.log(err);
        }
      }
    );
  } catch (e) {
    throw e;
  }
};
// //pariharams get all
// exports.pariharamsGetAll = (req, res) => {
//   dbConfig.query("SELECT * FROM pariharams", (err, rows, field) => {
//     if (!err) res.send(rows);
//     else console.log(err);
//   });
// };

//pariharams name get One
exports.pariharamsGetOne = (req, res) => {
  dbConfig.query(
    `SELECT * FROM pariharams WHERE pariharam_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Constant Name Create Schema
exports.pariharamsCreate = (req, res) => {
  var pariharam_name = req.body.pariharam_name;
  var created_by = req.body.created_by || 1;
  var is_active = req.body.is_active || 1;
  var description = req.body.description;
  var manthiram = req.body.manthiram;
  var pariharamImage = req.body.pariharamImage;

  console.log("req.body", req.body);

  var sql = `INSERT INTO pariharams
    ( pariharam_name,created_by, is_active,description,manthiram,pariharamImage) VALUES
      ("${pariharam_name}","${created_by}","${is_active}","${description}","${manthiram}","${pariharamImage}")`;
  console.log(sql, "here");
  dbConfig.query(sql, function (err, rows) {
    if (err !== null) {
      res.status(500).json({ error: "save failed", err: err });
    } else {
      res.status(201).json(rows);
    }
  });
};

//pariharams  update
exports.pariharamsUpdate = (req, res) => {
  var id = req.params.id;
  var pariharam_name = req.body.pariharam_name;
  var description = req.body.description;
  var manthiram = req.body.manthiram;
  var pariharamImage = req.body.pariharamImage;
  var created_by = req.body.created_by || 0;
  var is_active = req.body.is_active || 0;

  var sql = `UPDATE pariharams SET pariharam_name="${pariharam_name}",
description="${description}",
manthiram="${manthiram}",
pariharamImage="${pariharamImage}",
                                  created_by ="${created_by}",
                                  is_active ="${is_active}"
   WHERE pariharam_id="${id}" `;
  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("Record Inserted", sql);
    res.send(rows);
  });
};

//Constant name Delete
exports.pariharamsDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM pariharams WHERE pariharam_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
