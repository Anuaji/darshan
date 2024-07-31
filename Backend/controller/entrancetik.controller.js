const dbConfig = require("../database/config");

//entranceGetOne
exports.entranceGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM entrance_Tick", (err, rows, field) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
};

//entranceGetOne
exports.entranceGetOne = (req, res) => {
  dbConfig.query(
    `SELECT * FROM entrance_Tick WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//entranceCreate
exports.entranceCreate = (req, res) => {
  var ticket_amt = req.body.ticket_amt;
  var created_date = req.body.created_date;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;

  var sql = `INSERT INTO entrance_Tick
    ( ticket_amt, created_date, created_date, created_by, is_active) VALUES
      ("${ticket_amt}", "${created_date}", "${created_by}", "${is_active}")`;
  console.log(sql, "here");
  dbConfig.query(sql, function(err, rows, result) {
    if (err) throw err;
    console.log("Record Inserted Succesfully");
    res.send(rows);
  });
};

//entranceUpdate
exports.entranceUpdate = (req, res) => {
  var ticket_amt = req.body.ticket_amt;
  var created_date = req.body.created_date;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;

  var sql = `UPDATE entrance_Tick SET ticket_amt="${ticket_amt}",
                                created_date="${created_date}",
                                  created_by ="${created_by}",
                                  is_active ="${is_active}"
   WHERE id="${id}" `;
  dbConfig.query(sql, function(err, rows, result) {
    if (err) throw err;
    console.log("Record Inserted", sql);
    res.send(rows);
  });
};

//Constant name Delete
exports.entranceDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM entrance_Tick WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
