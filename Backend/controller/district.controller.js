const dbConfig = require("../database/config");

//District List
exports.districtList = (req, res) => {
  try {
    dbConfig.query(
      `SELECT
   *
      FROM
        districts 
      WHERE
        state_id = "${req.params.id}"`,
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//District all
exports.getAll = (req, res) => {
  try {
    dbConfig.query(
      `SELECT 
    districts.district, districts.active,
    districts.id, districts.state_id, states.state,
    districts.country_id
    FROM districts
    INNER JOIN
    states
    ON
    states.id = districts.state_id;`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//Create District
exports.createDistrict = (req, res) => {
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var district = req.body.district;
  var search_key = req.body.city;
  var active = req.body.active;

  var sql = `INSERT INTO districts
    (country_id,
    state_id,
    district,
    search_key,
    position,
    active)
    VALUES
    ("${country_id}",
    "${state_id}",
    "${district}",
    "${search_key}",
    "${1}",
    "${1}");`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.send(err);
    });
  } catch (e) {
    throw e;
  }
};

//Update district
exports.updateDistrict = (req, res) => {
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var district = req.body.district;
  var active = req.body.active;

  var sql = `UPDATE districts
    SET
    country_id = "${country_id}",
    state_id = "${state_id}",
    district = "${district}",
    active = "${active}"
    WHERE id = "${req.params.id}";`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
    });
  } catch (e) {
    throw e;
  }
};

//Delete district
exports.deleteDistrict = (req, res) => {
  try {
    dbConfig.query(
      `DELETE FROM districts WHERE id = "${req.params.id}"`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//Get on disrict
exports.getOneDistrict = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM districts WHERE id = "${req.params.id}"`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {}
};
