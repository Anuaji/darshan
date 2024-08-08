const dbConfig = require("../database/config");

//getallBlogs
// exports.pariharamsGetAll = (req, res) => {
//   try {
//     dbConfig.query(
//       `SELECT pariharam_id, pariharam_name
//         FROM pariharams ORDER BY pariharam_id DESC`,
//       (err, rows, fields) => {
//         if (!err) {
//           res.send(rows);
//           // console.log(rows, "rows");
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   } catch (e) {
//     throw e;
//   }
// };
exports.pariharamsGetAll = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM pariharams`,
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
// exports.pariharamsCreate = (req, res) => {
//   var pariharam_name = req.body.pariharam_name;
//   var created_by = req.body.created_by || 1;
//   var is_active = req.body.is_active || 1;
//   var description = req.body.description;
//   var manthiram = JSON.stringify(req.body.manthiram);
//   var pariharamImage = req.body.pariharamImage;
//   var mainGodName = req.body.mainGodName;

//   console.log("req.body", req.body);

//   var sql = `INSERT INTO pariharams
//     ( pariharam_name,created_by, is_active,description,manthiram,pariharamImage,mainGodName) VALUES
//       ("${pariharam_name}","${created_by}","${is_active}","${description}","${manthiram}","${pariharamImage}","${mainGodName}")`;
//   console.log(sql, "here");
//   dbConfig.query(sql, function (err, rows) {
//     if (err !== null) {
//       res.status(500).json({ error: "save failed", err: err });
//     } else {
//       res.status(201).json(rows);
//     }
//   });
// };

exports.pariharamsCreate = (req, res) => {
  const pariharam_name = req.body.pariharam_name;
  const created_by = req.body.created_by || 1;
  const is_active = req.body.is_active || 1;
  const description = req.body.description;
  const manthiram = JSON.stringify(req.body.manthiram);
  const pariharamImage = req.body.pariharamImage;
  const mainGodName = req.body.mainGodName;

  console.log("req.body", req.body);

  const sql = `INSERT INTO pariharams
    (pariharam_name, created_by, is_active, description, manthiram, pariharamImage, mainGodName)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  dbConfig.query(sql, [pariharam_name, created_by, is_active, description, manthiram, pariharamImage, mainGodName], function (err, rows) {
    if (err) {
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
  var mainGodName = req.body.mainGodName;
  var description = req.body.description;
  var manthiram = req.body.manthiram;
  var pariharamImage = req.body.pariharamImage;
  var created_by = req.body.created_by || 0;
  var is_active = req.body.is_active || 0;

  var sql = `UPDATE pariharams SET pariharam_name="${pariharam_name}",
description="${description}",
manthiram="${manthiram}",
pariharamImage="${pariharamImage}",
mainGodName="${mainGodName}"
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
