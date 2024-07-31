const dbConfig = require('../database/config');

let functiontype = {};

// create function type
functiontype.createFunctionType = async (req) =>{
 return new Promise((resolve, reject) => {
     try{
        const function_code = req.body.function_code;
        const function_type = req.body.function_type;

        const sql = `INSERT INTO function_type(
            function_code,
            function_type
            )
            VALUES("${function_code}","${function_type}")`;
        const sql2 = `SELECT * FROM function_type WHERE function_code="${function_code}"`;
        let isCodeAlreadyExist=false;
        dbConfig.query(sql2,(err,result)=>{
            if(err){
                reject(err);
            }
            else if(result.length !=0){
                isCodeAlreadyExist=true;
            }
        })
        dbConfig.query(sql,(err,result)=>{
            if(err){
                return reject(err);
            }
            else if(isCodeAlreadyExist){
                return reject({status:409,message:"Function code already exists"})
            }
            else{
                return resolve(result);
            }
            
        })
     }   
     catch(e){
         return reject(e)
     }
 })
}

// get function type
functiontype.getFunctionType = async (req) =>{
    return new Promise((resolve, reject) => {
        try{
           const sql = `SELECT * FROM function_type WHERE function_code="${function_code}"`;
        //    let isCodeAlreadyExist=false;
           
           dbConfig.query(sql,(err,result)=>{
               if(err){
                   return reject(err);
               }
               else if(isCodeAlreadyExist){
                   return reject({status:409,message:"Function code already exists"})
               }
               else{
                   return resolve(result);
               }
               
           })
        }   
        catch(e){
            return reject(e)
        }
    })
   }
// getall
   functiontype.getAllFunctionType = async (req) =>{
    return new Promise((resolve, reject) => {
        try{
           const sql = `SELECT * FROM function_type`;
            
           dbConfig.query(sql,(err,result)=>{
               if(err){
                   return reject(err);
               }
               else{
                   return resolve(result);
               }
               
           })
        }   
        catch(e){
            return reject(e)
        }
    })
   }

// Edit function type 

functiontype.editFunctionType = async (req) =>{
    return new Promise((resolve, reject) => {
        try{
           const function_code = req.body.function_code;
           const function_type = req.body.function_type;
   
           const sql = `UPDATE function_type
           SET function_code = "${function_code}", function_type = "${function_type}"
           WHERE  function_code="${function_code}"`;

           dbConfig.query(sql,(err,result)=>{
               if(err){
                   reject(err);
               }
               else if(result.length !=0){
                //    isCodeAlreadyExist=true;
               }
           })
           dbConfig.query(sql,(err,result)=>{
               if(err){
                   return reject(err);
               }
               else if(isCodeAlreadyExist){
                   return reject({status:409,message:"Function code already exists"})
               }
               else{
                   return resolve(result);
               }
               
           })
        }   
        catch(e){
            return reject(e)
        }
    })
   }
// Delete function type 

functiontype.deleteFunctionType = async (req) =>{
    return new Promise((resolve, reject) => {
        try{
   
           const sql = `DELETE from function_type
           WHERE  function_code="${req.params.id}"`;

           dbConfig.query(sql,(err,result)=>{
               if(err){
                   reject(err);
               }
               else if(result.length !=0){
                //    isCodeAlreadyExist=true;
               }
           })
           dbConfig.query(sql,(err,result)=>{
               if(err){
                   return reject(err);
               }
               else if(isCodeAlreadyExist){
                   return reject({status:409,message:"Function code already exists"})
               }
               else{
                   return resolve(result);
               }
               
           })
        }   
        catch(e){
            return reject(e)
        }
    })
   }

module.exports = functiontype;