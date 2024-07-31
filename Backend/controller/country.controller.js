const dbConfig = require("../database/config");

//Country List
exports.countryGetAll = (req, res) => {
  try {
    dbConfig.query(`SELECT * FROM countries`, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    throw e;
  }
};

//Get One Country
exports.countryGetOne = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM countries WHERE id = ${req.params.id}`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//Create Country
exports.countryCreate = (req, res) => {
  var code = req.body.code;
  var country = req.body.country;
  var search_key = req.body.country;
  var active = req.body.active;

  var sql = `INSERT INTO countries
    (country_code,
    code,
    country,
    search_key,
    position,
    active)
    VALUES
    (
    "${"NIL"}",
    "${"+" + code}",
    "${country}",
    "${search_key}",
    "${1}",
    "${1}")`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).json(rows);
      }
    });
  } catch (e) {
    throw e;
  }
};

//Update country
exports.countryUpdate = (req, res) => {
  var code = req.body.code;
  var country = req.body.country;
  var sql = `UPDATE countries
    SET
    code = "${"+" + code}",
    country = "${country}"
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

//Delete Country
exports.countryDelete = (req, res) => {
  var sql = `DELETE FROM countries WHERE id = ${req.params.id}`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};
