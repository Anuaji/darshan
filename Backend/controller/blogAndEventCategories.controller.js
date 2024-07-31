const dbConfig = require('../database/config');
require('dotenv').config();

let categories = {};


// Get Category
categories.getCategories = async (req) =>{
    return new Promise((resolve, reject) => {
        try{

           const sql = `SELECT * FROM blogandeventcategories`;
   
               dbConfig.query(sql,(err,result)=>{
                   if(err){
                       return reject(err);
                   }
                   else{
                       return resolve(result);
                   }
               });
           }catch(e){
            return reject(e)
        }
    })
   }

   // Get Single Category
categories.getSingleCategories = async (req) =>{
    return new Promise((resolve, reject) => {
        try{
            var id = req.params.id;

           const sql = `SELECT * FROM blogandeventcategories WHERE id = ${id}`;
   
               dbConfig.query(sql,(err,result)=>{
                   if(err){
                       return reject(err);
                   }
                   else{
                       return resolve(result);
                   }
               });
           }catch(e){
            return reject(e)
        }
    })
   }

// Create Category

categories.create = async(req) =>{
    return new Promise((resolve, reject) => {
        try{
            console.log("body",req.body)
            var category_name = req.body.categoryName;

            const sql = `INSERT INTO blogandeventcategories (category_name) VALUES("${category_name}")`;
   
            dbConfig.query(sql,(err,result)=>{
                if(err){
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            });
        }catch(e){
            return reject(e);
            }
        })
        };

// Delete Category
categories.delete = async(req) =>{
    return new Promise((resolve, reject) => {
        try{
            var id = req.body.id;

            const sql = `DELETE FROM blogandeventcategories WHERE id = '${id}'`;
   
            dbConfig.query(sql,(err,result)=>{
                if(err){
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            });
        }catch(e){
            return reject(e);
            }
        })
        };


// Update Category
categories.update = async(req) =>{
    return new Promise((resolve, reject) => {
        try{
            var id = req.body.id;
            var category_name = req.body.categoryName;

            const sql = `UPDATE blogandeventcategories SET category_name = "${category_name}"  WHERE id = "${id}"`;

            dbConfig.query(sql,(err,result)=>{
                if(err){
                    console.log(err,"err");
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            });
        }catch(e){
            return reject(e);
            }
        })
        };



module.exports = categories;