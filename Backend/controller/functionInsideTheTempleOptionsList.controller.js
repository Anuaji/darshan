const dbConfig = require('../database/config');
require('dotenv').config();

let insidefunction = {};


// Get function inside
insidefunction.getAll = async (req) => {
    return new Promise((resolve, reject) => {
        try {

            const sql = `SELECT * FROM functioninsidethetemple`;

            dbConfig.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            });
        } catch (e) {
            return reject(e)
        }
    })
}

// Get single function inside
insidefunction.getSingleInsideFuction = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            var id = req.params.id;

            const sql = `SELECT * FROM functioninsidethetemple where FunctionInsideTheTempleID = ${id}`;

            dbConfig.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            });
        } catch (e) {
            return reject(e)
        }
    })
}


// Create

insidefunction.create = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            var FunctionInsideTheTemple = req.body.FunctionInsideTheTemple;

            const sql = `INSERT INTO functioninsidethetemple (FunctionInsideTheTemple) VALUES ('${FunctionInsideTheTemple}')`;
            dbConfig.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            })
        } catch (e) {
            return reject(e);
        }
    })
}

// Edit

insidefunction.update = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            var id = req.params.id;
            var FunctionInsideTheTemple = req.body.FunctionInsideTheTemple;

            const sql = `UPDATE functioninsidethetemple SET FunctionInsideTheTemple = "${FunctionInsideTheTemple}"  WHERE FunctionInsideTheTempleID = '${id}'`;
            dbConfig.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            })
        } catch (e) {
            return reject(e);
        }
    })
}


// Delete

insidefunction.delete = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            var id = req.params.id;

            const sql = `DELETE FROM functioninsidethetemple WHERE FunctionInsideTheTempleID = '${id}'`;
            dbConfig.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            })
        } catch (e) {
            return reject(e);
        }
    })
}

//Get the functionname based on temple id

insidefunction.getAllfunctionName = async (req) => {
    return new Promise((resolve, reject) => {
        try {

            var id = req.params.id
            const sql = `SELECT functioninsidethetemple.FunctionInsideTheTempleID as  FunctionId,functioninsidethetemple.FunctionInsideTheTemple as FunctionName FROM temple LEFT JOIN functioninsidethetemple on
             FIND_IN_SET(functioninsidethetemple.FunctionInsideTheTempleID,temple.functionsInsideTemple) WHERE temple.id = ${id}`;

            dbConfig.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            });
        } catch (e) {
            return reject(e)
        }
    })
}



module.exports = insidefunction;