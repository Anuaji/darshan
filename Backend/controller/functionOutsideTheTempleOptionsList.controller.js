
const dbConfig = require('../database/config');


functionOutsideTheTempleOptions = {};


functionOutsideTheTempleOptions.getAll = async () => {
    return new Promise((resolve, reject) => {
        try{
          const sql = `SELECT * FROM functionoutsidethetemple`;
          dbConfig.query(sql, (err, result) => {
              if(!err){
                  return resolve(result);
              }else{
                  return reject(err);
              }
          })
        }catch(e){
            return reject(e);
        }
    })
}

// Get single function inside
functionOutsideTheTempleOptions.getSingleOutsideFuction = async (req) =>{
    return new Promise((resolve, reject) => {
        try{
            var id = req.params.id;

           const sql = `SELECT * FROM functionoutsidethetemple where FunctionOutsideTheTempleID = ${id}`;
   
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

functionOutsideTheTempleOptions.create = async(req)=>{
 return new Promise((resolve, reject) => {
    try{
        var functionName = req.body.functionName;
    const sql = `INSERT INTO functionoutsidethetemple (FunctionOutsideTheTemple) VALUES("${functionName}")`;
    dbConfig.query(sql, (err, result) => {
        if(!err){
            return resolve(result);
        }else{
            return reject(err);
        }
    })
    }catch(e){
        return reject(e)
    }
})
}

functionOutsideTheTempleOptions.updateOne = async(req)=>{
  return  new Promise((resolve, reject) => {
        try{
            var functionName = req.body.functionName;
            var functionOutsideTheTempleID = req.params.id;
        const sql = `UPDATE functionoutsidethetemple SET FunctionOutsideTheTemple = "${functionName}" WHERE FunctionOutsideTheTempleID = "${functionOutsideTheTempleID}"`;
        dbConfig.query(sql, (err, result) => {
            if(!err){
                return resolve(result);
            }else{
                return reject(err);
            }
        })
        }catch(e){
            return reject(e);

        }
    })
    }
    
    functionOutsideTheTempleOptions.deleteOne = async(req)=>{
      return  new Promise((resolve, reject) => {
            try{
            
                var functionOutsideTheTempleID = req.params.id;
            const sql = `DELETE FROM functionoutsidethetemple WHERE FunctionOutsideTheTempleID = "${functionOutsideTheTempleID}"`;
            dbConfig.query(sql, (err, result) => {
                if(!err){
                    return resolve(result);
                }else{
                    return reject(err);
                }
            })
            }catch(e){
                return reject(e);

            }
        })
        }
        
module.exports = functionOutsideTheTempleOptions;