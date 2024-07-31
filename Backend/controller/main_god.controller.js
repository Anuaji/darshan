const dbConfig = require("../database/config");

//main_god get all
exports.main_godGetAll = (req, res) => {
  try {
    dbConfig.query(
      "SELECT * FROM main_god ORDER BY main_god_id DESC",
      (err, rows, field) => {
        if (!err) {
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};
//get MaingodName for footer Lists
exports.get_godNameList = (req, res) => {
  try {
    dbConfig.query(
      "SELECT DISTINCT god_name FROM main_god",
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
      "SELECT COUNT(id) AS count FROM temple",
      (err, rows, fields) => {
        if (!err) res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};
//main_god name get One
exports.main_godGetOne = (req, res) => {
  console.log(req.params.id);
  dbConfig.query(
    `SELECT * FROM main_god WHERE main_god_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Constant Name Create Schema
exports.main_godCreate = (req, res) => {
  var god_name = req.body.god_name;
  var created_by = req.body?.created_by || 1;
  var is_active = req.body?.is_active || 1;

  var sql = `INSERT INTO main_god
    ( god_name, created_by, is_active) VALUES
      ("${god_name}", "${created_by}", "${is_active}")`;
  dbConfig.query(sql, function (err, rows) {
    if (err !== null) {
      res.status(500).json({ error: "save failed", err: err });

    } else {
      res.status(201).json(rows);
    };
  });
};

//main_god  updat
exports.main_godUpdate = (req, res) => {
  var id = req.params.id;
  var god_name = req.body.god_name;
  var created_by = req.body?.created_by || 1;
  var is_active = req.body?.is_active || 1;

  var sql = `UPDATE main_god SET god_name="${god_name}",
                                  created_by ="${created_by}",
                                  is_active ="${is_active}"
   WHERE main_god_id="${id}" `;
  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    res.send(rows);
  });
};

//Constant name Delete
exports.main_godDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM main_god WHERE main_god_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
