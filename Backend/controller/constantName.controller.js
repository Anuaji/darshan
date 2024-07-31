const dbConfig = require("../database/config");

//Constant name get all
exports.ConstantnameGetAll = (req, res) => {
    dbConfig.query("SELECT * FROM Constantname", (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
};

//Constant name get One
exports.ConstantnameGetOne = (req, res) => {
    dbConfig.query(
        `SELECT * FROM Constantname WHERE constantName_id = ${req.params.id}`,
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
};
//Constant Name Create Schema
exports.ConstantnameCreate = (req, res) => {
    var constant_name = req.body.constant_name;
    var sql = `INSERT INTO Constantname
    ( constant_name) VALUES
      ("${constant_name}"
     )`;
    console.log(sql, "here");
    dbConfig.query(sql, function(err, rows, result) {
        if (err) throw err;
        console.log("Record Inserted");
        res.send(rows);
    });
};

//Constant Name Update
exports.ConstantnameUpdate = (req, res) => {
    var id = req.params.id;
    var constant_name = req.body.constant_name;

    var sql = `UPDATE Constantname SET  constant_name="${constant_name}" WHERE constantName_id=${id}`;
    dbConfig.query(sql, function(err, rows, result) {
        if (err) throw err;
        console.log("Record Inserted", sql);
        res.send(rows);
    });
};

//Constant name Delete
exports.ConstantnameDelete = (req, res) => {
    dbConfig.query(
        `DELETE FROM Constantname WHERE constantName_id = ${req.params.id}`,
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
};