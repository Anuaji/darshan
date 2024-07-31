//Import from database
const dbConfig = require("../database/config");
//SP citylist
exports.cityList = (req, res) => {
  console.log(req.params.id);
  try {
    dbConfig.query(
      `SELECT
      city, id, district_id
      FROM
        city
      WHERE
        district_id =  "${req.params.id}";`,
      (err, rows, fields) => {
        if (!err) {
          // console.log(rows, "here");
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//city list
exports.getAllCity = (req, res) => {
  try {
    dbConfig.query(
      `SELECT
    DISTINCT
    city.id, city.country_id, city.state_id, city.district_id,
    countries.country,states.state, districts.district,
    city.city, city.is_active
    FROM
    city
    INNER JOIN
    countries
    ON
    countries.id = city.country_id
    INNER JOIN
    states
    ON
    states.id = city.state_id
    INNER JOIN
    districts
    ON
    districts.id = city.district_id;`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//city create
exports.createCity = (req, res) => {
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var district_id = req.body.district_id;
  var city = req.body.city;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;

  var sql = `INSERT INTO city
    (
    country_id,
    state_id,
    district_id,
    city,
    created_by,
    is_active)
    VALUES
    (    "${country_id}",
    "${state_id}",
    "${district_id}",
    "${city}",
    "${1}",
    "${1}");`;

  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};

//Update city
exports.updateCity = (req, res) => {
  console.log("res@@@", res);
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var district_id = req.body.district_id;
  var city = req.body.city;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;
  var sql = `UPDATE city
    SET
    country_id = "${country_id}",
    state_id = "${state_id}",
    district_id = "${district_id}",
    city = "${city}",
    created_by = "${1}",
    is_active = "${1}"
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

//delete city
exports.deleteCity = (req, res) => {
  try {
    dbConfig.query(
      `DELETE FROM city WHERE id = "${req.params.id}"`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//Get one city
exports.getOneCity = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM city WHERE id = "${req.params.id}";`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

// //city based on districtId
// exports.cityList = (req, res) => {
//   try {
//     dbConfig.query(
//       `call cityList("${req.params.id}");`,
//       (err, rows, fields) => {
//         if (!err) res.send(rows[0]);
//         else console.log(err);
//       }
//     );
//   } catch (e) {
//     throw e;
//   }
// };
