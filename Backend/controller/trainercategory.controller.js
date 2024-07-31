dbConfig = require('../database/config');
require('dotenv').config();

let trainerCategory = {};

trainerCategory.create = async(req) =>{
    return new Promise((resolve, reject)=>{
        try{
            var categoryName = req.body.categoryName;
            const sql = `INSERT INTO trainercategory (categoryName) VALUES ('${categoryName}')`;

            dbConfig.query(sql,(err, result)=>{
                if(err){
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            })


        }catch(e){
            return reject(e);
        }
    })
}

trainerCategory.getAll = async(req) =>{
    return new Promise((resolve, reject)=>{
        try{
            const sql = `SELECT * FROM trainercategory`;
            dbConfig.query(sql, (err, res) =>{
                if(err){
                    return reject(err);
                }
                else{
                    return resolve(res);
                }
            })

        }catch(e){
            return reject(e);
        }
    })
}

trainerCategory.delete = async(req)=>{
    return new Promise((resolve, reject)=>{
        var categoryId = req.params.categoryId;
        const sql = `DELETE FROM trainercategory WHERE categoryId  = "${categoryId}"`;
        dbConfig.query(sql, (err, res)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(res);
            }
        })
    })
}

trainerCategory.update = async(req)=>{
    return new Promise((resolve, reject)=>{
        var categoryName = req.body.categoryName;
        var categoryId = req.params.categoryId;
        const sql = `UPDATE trainercategory SET categoryName = "${categoryName}" WHERE categoryId = "${categoryId}"`;
        dbConfig.query(sql, (err, res)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(res);
            }
        })
    })
}

trainerCategory.getOne = async(req)=>{
    return new Promise((resolve, reject)=>{
        var categoryId = req.params.categoryId;
        const sql = `SELECT * FROM trainercategory WHERE categoryId = "${categoryId}"`;
        dbConfig.query(sql, (err, res)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(res);
            }
        })
    })
}

module.exports = trainerCategory;