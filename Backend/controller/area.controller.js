//Import from database
const dbConfig = require("../database/config");

//CREATE AREA
exports.createArea = function (req, res) {
  console.log(req.body, "body");
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var city_id = req.body.city_id;
  var district_id = req.body.district_id;
  var area_name = req.body.area_name;
  var is_active = req.body.is_active;
  var sql = `INSERT INTO area
    (country_id,
    state_id,
    district_id,
    city_id,
    area_name,
    is_active)
    VALUES
    ("${country_id}",
    "${state_id}",
    "${district_id}",
    "${city_id}",
    "${area_name}",
    "${1}");`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (err) console.log(err);
      else res.send(rows);
    });
  } catch (e) {
    throw e;
  }
};

//UPDATE AREA
exports.updateArea = function (req, res) {
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var city_id = req.body.city_id;
  var area_name = req.body.area_name;
  var is_active = req.body.is_active;
  var district_id = req.body.district_id;
  var sql = `UPDATE area
    SET    
    country_id = "${country_id}",
    state_id = "${state_id}",
    district_id = "${district_id}",
    city_id = "${city_id}",
    area_name = "${area_name}",
    is_active = "${is_active}"
    WHERE area_id = "${req.params.id}";`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (err) console.log(err);
      else res.send(rows);
    });
  } catch (e) {
    throw e;
  }
};

//GET ONE AREA
exports.getOne = function (req, res) {
  try {
    dbConfig.query(
      `SELECT * FROM area WHERE area_id = "${req.params.id}"`,
      (err, rows, fields) => {
        if (err) console.log(err);
        else res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};

//GET ALL AREA
exports.getAll = function (req, res) {
  try {
    dbConfig.query(
      `SELECT
    area.area_id, 
    area.country_id,
    area.state_id,
    area.district_id,
    area.city_id,
    area.area_name,
    area.is_active,
    area.created_date,
    countries.country,states.state, districts.district,
    city.city
    FROM area
    INNER JOIN 
    countries
    ON
    countries.id = area.country_id
    INNER JOIN
    states
    ON
    states.id = area.state_id
    INNER JOIN
    districts
    ON
    districts.id = area.district_id
    INNER JOIN
    city
    ON
    city.id = area.city_id;
    `,
      (err, rows, fields) => {
        if (err) console.log(err);
        else res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};

//GET ALL AREA
exports.getArea = function (req, res) {
  try {
    dbConfig.query(
      `SELECT * FROM area WHERE city_id = "${req.params.id}" `,
      (err, rows, fields) => {
        if (err) console.log(err);
        else res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};

//DELETE AREA
exports.deleteArea = function (req, res) {
  try {
    dbConfig.query(
      `DELETE FROM area WHERE area_id = "${req.params.id}"`,
      (err, rows, fields) => {
        if (err) console.log(err);
        else res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};
