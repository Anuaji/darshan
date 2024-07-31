const dbConfig = require('../database/config');
require('dotenv').config();

let iyer = {};

// Create function name
iyer.createFunction = async (req) =>{
 return new Promise((resolve, reject) => {
     try{
        const code = req.body.code;
        const function_name = req.body.function_name;
        const search_key = req.body.function_name;
        const active = req.body.active;

        const sql = `INSERT INTO function(
            code,function_name,search_key,active)
            VALUES("${code}","${function_name}","${search_key}","${active}")`;

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

// Get function
iyer.getFunction = async (req) =>{
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

   // get function match with function name and language
iyer.getLangRelFunction = async (req) =>{
    var langid = req.body.lang;
    return new Promise((resolve, reject) => {
        try{            
           const sql = `SELECT * FROM functions WHERE FIND_IN_SET ('${langid}',languages)`;
            console.log(sql);
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


   // get function match with function name and language
   iyer.searchLangRelFunction = async (req) =>{
    var langid = req.body.lid;
    var fun = req.body.fun;
    return new Promise((resolve, reject) => {
        try{        
            var sql = `SELECT * FROM functions WHERE FunctionID IS NOT NULL `;
            if(langid){
                sql += `and FIND_IN_SET ('${langid}',languages) `;
            }
            if(fun){
                sql += `and FunctionName = '${fun}'`
            }
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