const dbConfig = require('../database/config');

module.exports.getAllCategories = async (req, res) => {
    try {
        const sql = `SELECT * FROM categorieslist`;

        dbConfig.query(sql, (err, rows) => {
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(500).send(err);
            }
        });
    } catch (err) {
        if (err) {
            res.status(500).send(err);
        }
    }
};

module.exports.createNewCategory = async (req, res) => {
    try {
        const categoryName = req.body.categoryName;
        const sql = `INSERT INTO categorieslist (categoryName) VALUES("${categoryName}")`;

        dbConfig.query(sql, (err, rows) => {
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(500).send(err);
            }
        });
    } catch (err) {
        if (err) {
            res.status(500).send(err);
        }
    }
};
module.exports.categoriesUpdate = (req, res) => {
    var id = req.params.id;
    var categoryName = req.body.categoryName;

    var sql = `UPDATE categorieslist SET categoryName="${categoryName}"
     WHERE categoryId="${id}" `;
    dbConfig.query(sql, function (err, rows, result) {
        if (err) throw err;
        console.log('Record Inserted', sql);
        res.send(rows);
    });
};
exports.getAllRoutes = (req, res) => {
    var city_id = req.params.id;
    try {
        const sql= `SELECT id,temple_name
        FROM temple WHERE city_id = ${city_id}`;
        dbConfig.query(sql, (err, rows, fields) => {
                if (!err) res.send(rows);            
                else console.log(err);
            }
        );
    } catch (e) {
        throw e;
    }
};
exports.Deleteone = (req, res) => {
    try {
        dbConfig.query(`DELETE FROM categorieslist WHERE categoryId  = "${req.params.id}"`, (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        });
    } catch (e) {
        throw e;
    }
};

module.exports.getSingleCategoty = async(req) => {
    return new Promise((resolve, reject) =>{
        try{
            const categoryId = req.params.categoryId;
         const sql = `SELECT * FROM categorieslist WHERE categoryId ="${categoryId}"`;
         dbConfig.query(sql,(err,result) =>{
             if(err){
                 console.log("Error!",err);
                return reject({status:500, message:"Failed to get category"});
             }
             else if(result.length == 0){
                return reject({status:404, message:"No category Found"});
             }
             else if(result.length !=0){
               return resolve(result);
             }
         })
        }catch(e){
            console.log("Error!!",e);
            return reject({status:500, message:"error occured"});
        }
    })
}