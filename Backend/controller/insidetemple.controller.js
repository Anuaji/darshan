const dbConfig = require("../database/config");

//Inside Temple List
exports.insideTempleGetAll = (req, res) => {
  try {
    dbConfig.query(`SELECT * FROM inside_temple`, (err, rows, fields) => {
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

//Get One Inside Temple
exports.insideTempleGetOne = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM inside_temple WHERE id = ${req.params.id}`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//Create Inside Temple
exports.insideTempleCreate = (req, res) => {
  var temple_code = req.body.temple_code;
  var temple_pooja = req.body.temple_pooja;
  var active = req.body.active;

  var sql = `INSERT INTO inside_temple
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
        // console.log(rows);
      } else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};

//Update Inside Temple
exports.insideTempleUpdate = (req, res) => {
  var temple_code = req.body.temple_code;
  var temple_pooja = req.body.temple_pooja;
  var sql = `UPDATE inside_temple
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

//Inside Temple Country
exports.insideTempleDelete = (req, res) => {
  var sql = `DELETE FROM inside_temple WHERE id = ${req.params.id}`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};
