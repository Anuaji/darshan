//Import db configuration
const dbConfig = require("../database/config");

//State list
exports.stateList = (req, res) => {
  console.log(req.params.id);
  try {
    dbConfig.query(
      `SELECT a.state, a.id, a.country_id FROM states a WHERE a.country_id = "${req.params.id}";`,
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

//State list
exports.getAll = (req, res) => {
  try {
    dbConfig.query(
      `SELECT states.country_id, states.id, states.active,
    countries.country, states.state
     FROM states
     INNER JOIN
     countries
     ON
     countries.id = states.country_id;`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//create State
exports.createState = (req, res) => {
  var country_id = req.body.country_id;
  var state = req.body.state;
  var active = 1;

  var sql = `INSERT INTO states (country_id,state,active)
    VALUES("${country_id}", "${state}", "${active}");`;
  try {
    dbConfig.query(sql, (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
      }
    });
  } catch (e) {
    res.send(e);
  }
};

//update state
exports.updateState = (req, res) => {
  var country_id = req.body.country_id;
  var state = req.body.state;
  var active = req.body.active;
  try {
    dbConfig.query(
      `UPDATE states
        SET
        country_id = "${country_id}",
        state = "${state}",
        active = "${active}"
        WHERE id = "${req.params.id}";`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//Delete state
exports.deleteState = (req, res) => {
  try {
    dbConfig.query(
      `DELETE FROM states WHERE id = "${req.params.id}";`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(res);
      }
    );
  } catch (e) {
    throw e;
  }
};

//GetOne State
exports.getOneState = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM states WHERE id = "${req.params.id}";`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};
