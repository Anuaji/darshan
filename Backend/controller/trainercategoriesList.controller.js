const dbConfig = require('../database/config');

trainercategoriesList = {};

trainercategoriesList.categoriesListCreate = async(req)=>{
    return new Promise((resolve,reject)=>{
        try{
    
    var categoryName = req.body.categoryName;
    const sql = `INSERT INTO trainercategorieslist (categoryName) VALUES ("${categoryName}")`;
    dbConfig.query(sql,(err,result)=>{
        if (!err) {
            return resolve(result);
        }
        else{
            return reject(err);
        }
    })
        }catch(err){
            return reject(err);
        }
    })
}
trainercategoriesList.updatecategoriesList = async(req,res)=>{
   return new Promise((resolve,reject)=>{
       try{
        var id = req.params.id;
        var categoryName = req.body.categoryName;
        const sql =`UPDATE  trainercategorieslist SET categoryName =("${categoryName}") WHERE id =("${id}")`;
        dbConfig.query(sql,(err,result)=>{
            if (!err) {
                return resolve(result);
            }
            else{
                return reject(err);
            }
        })
       }
       catch(err){
           return reject(err);
       }
   })
} 
trainercategoriesList.getallCategoriesList = async(req,res)=>{
    return new Promise((resolve,reject)=>{
        try{
   const sql = `SELECT * FROM trainercategorieslist`;
   dbConfig.query(sql,(err,result)=>{
       if (!err) {
           return resolve(result);
       }
       else{
           return reject(err);
       }
   })
        }catch(err){
            return reject(err);
        }
    })
}

trainercategoriesList.getoneCategoriesList = async(req,res)=>{
    return new Promise((resolve,reject)=>{
        try{
    var id = req.params.id;
    const sql = `SELECT * FROM trainercategorieslist WHERE id="${id}"`;
    dbConfig.query(sql,(err,result)=>{
        if (!err) {
            return resolve(result);
        }
        else{
            return reject(reject);
          }
    })
        }catch(err){
            return reject(err);
        }
    })
}
trainercategoriesList.deleteCategoriesList = async(req,res)=>{
    return new Promise((resolve,reject)=>{
        try{
    var id = req.params.id;
    const sql = `DELETE FROM trainercategorieslist WHERE id = "${id}"`;
    dbConfig.query(sql,(err,result)=>{
        if (!err) {
            return resolve(result);
        }
        else{
            return reject(err);
        }
    })
        }catch(err){
            return reject(err);
        }
    })
}
module.exports =trainercategoriesList;