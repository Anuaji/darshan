const dbConfig = require("../database/config");

//Constant name get all
exports.ConstantGetAll = (req, res) => {
    dbConfig.query("SELECT * FROM Constants", (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
};
//Constant name get One
exports.ConstantGetOne = (req, res) => {
    dbConfig.query(
        `SELECT * FROM Constants WHERE constantName_id = ${req.params.id}`,
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
};
//Constant Name Create Schema
exports.ConstantCreate = (req, res) => {
    var constant_value = req.body.constant_value;
    var sql = `INSERT INTO Constants
    (constant_value) VALUES
      ("${constant_value}"
     )`;
    console.log(sql, "here");
    dbConfig.query(sql, function(err, rows, result) {
        if (err) throw err;
        console.log("Record Inserted");
        res.send(rows);
    });
};
//Constant Name Update
exports.ConstantUpdate = (req, res) => {
    var id = req.params.id;
    var constant_value = req.body.constant_value;

    var sql = `UPDATE Constants SET  constant_value="${constant_value}" WHERE constantName_id=${id}`;
    dbConfig.query(sql, function(err, rows, result) {
        if (err) throw err;
        console.log("Record Inserted", sql);
        res.send(rows);
    });
};
//Constant name Delete
exports.ConstantDelete = (req, res) => {
    dbConfig.query(
        `DELETE FROM Constants WHERE constantName_id = ${req.params.id}`,
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
};