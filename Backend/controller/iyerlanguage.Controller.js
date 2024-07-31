const dbConfig = require('../database/config');
require('dotenv').config();

let iyer = {};

// Create Language
iyer.createLanguage = async (req) =>{
 return new Promise((resolve, reject) => {
     try{
        const code = req.body.code;
        const language = req.body.language;
        const search_key = req.body.language;
        const active = req.body.active;

        const sql = `INSERT INTO language(
            code,language,search_key,active)
            VALUES("${code}","${language}","${search_key}","${active}")`;

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

// Get language
iyer.getLanguage = async (req) =>{
    return new Promise((resolve, reject) => {
        try{

           const sql = `SELECT * FROM language`;
   
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



module.exports = iyer;