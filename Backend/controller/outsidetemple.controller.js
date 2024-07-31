const dbConfig = require("../database/config");

//Outside Temple List
exports.outsideTempleGetAll = (req, res) => {
  try {
    dbConfig.query(`SELECT * FROM outside_temple`, (err, rows, fields) => {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    throw e;
  }
};

//Get One Outside Temple
exports.outsideTempleGetOne = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM outside_temple WHERE id = ${req.params.id}`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//Create Outside Temple
exports.outsideTempleCreate = (req, res) => {
  var temple_code = req.body.temple_code;
  var temple_pooja = req.body.temple_pooja;
  var active = req.body.active;

  var sql = `INSERT INTO outside_temple
    (temple_code,
    temple_pooja,
    searchkey,
    position,
    active)
    VALUES
    (
    "${temple_code}",
    "${temple_pooja}",
    "${temple_pooja}",
    "${1}",
    "${active}")`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};

//Update Outside Temple
exports.outsideTempleUpdate = (req, res) => {
  var temple_code = req.body.temple_code;
  var temple_pooja = req.body.temple_pooja;
  var sql = `UPDATE outside_temple
    SET
    temple_code = "${"+" + temple_code}",
    temple_pooja = "${temple_pooja}",
    searchkey = "${temple_pooja}"
    WHERE id = "${req.params.id}";`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};

//Outside Temple Country
exports.outsideTempleDelete = (req, res) => {
  var sql = `DELETE FROM outside_temple WHERE id = ${req.params.id}`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};
