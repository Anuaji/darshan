const dbConfig = require("../database/config");

//training get all
exports.trainingGetAll = (req, res) => {
  dbConfig.query(
    "SELECT * FROM training ORDER BY training_id DESC",
    (err, rows, field) => {
      if (!err) {
        // console.log(rows, "here");
        res.send(rows);
      } else console.log(err);
    }
  );
};

//training name get One
exports.trainingGetOne = (req, res) => {
  dbConfig.query(
    `SELECT * FROM training WHERE training_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Constant Name Create Schema
exports.trainingCreate = (req, res) => {
  try {
    var training_name = req.body.training_name;
    var created_by = req.body.created_by;
    var is_active = req.body.is_active;

    var sql = `INSERT INTO training (training_name,created_by, is_active) VALUES ("${training_name}", "${created_by}", "${is_active}")`;
    console.log(sql, "here");
    dbConfig.query(sql, (error, rows) => {
      if (error) {
        res.send(error);
      } else {
        res.send(rows);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//training  update
exports.trainingUpdate = (req, res) => {
  var id = req.params.id;
  var training_name = req.body.training_name;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;

  var sql = `UPDATE training SET training_name="${training_name}",
                                  created_by ="${created_by}",
                                  is_active ="${is_active}"
   WHERE training_id="${id}" `;
  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("Record Inserted", sql);
    res.send(rows);
  });
};

//Constant name Delete
exports.trainingDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM training WHERE training_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.getApproveTrainer = (_req, res) => {
  dbConfig.query(
    "SELECT * FROM `trainer_register` WHERE `isApproved` = 1",
    (err, rows, _field) => {
      if (!err) {
        // res.status(200).json({
        //   status: "Success",
        //   message: "Required Approved Temple is fetched ",
        //   results: rows,
        // });
        console.log("rows", rows);
        res.status(201).send(rows);
      } else {
        res.status(500).json({
          status: "Failed",
          message: "Something wrong happened ",
        });
      }
    }
  );
};
