const dbConfig = require("../database/config");

//Constant name get all
exports.TempleeventGetAll = (req, res) => {
    dbConfig.query("SELECT * FROM temple_event ORDER BY temple_eventid DESC", (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
};
//Constant name get One
exports.TempleeventGetOne = (req, res) => {
    dbConfig.query(
        `SELECT * FROM temple_event WHERE temple_eventid = ${req.params.id}`,
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
};
//Constant Name Create Schema
exports.TempleeventCreate = (req, res) => {
    var event_name = req.body.event_name;
    var sql = `INSERT INTO temple_event
    ( event_name) VALUES
      ("${event_name}"
     )`;
    // console.log(sql, "here");
    dbConfig.query(sql, function (err, rows, result) {
        if (err) throw err;
        console.log("Record Inserted");
        res.send(rows);
    });
};
//Constant Name Update
exports.TempleeventUpdate = (req, res) => {
    var id = req.params.id;
    var event_name = req.body.event_name;

    var sql = `UPDATE temple_event SET  role_name="${event_name}" WHERE temple_eventid=${id}`;
    dbConfig.query(sql, function (err, rows, result) {
        if (err) throw err;
        console.log("Record Inserted", sql);
        res.send(rows);
    });
};
//Constant name Delete
exports.TempleeventDelete = (req, res) => {
    dbConfig.query(
        `DELETE FROM temple_event WHERE temple_eventid = ${req.params.id}`,
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
};