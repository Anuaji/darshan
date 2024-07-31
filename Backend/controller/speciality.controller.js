const dbConfig = require('../database/config');
require('dotenv').config();

let speciality = {};

// create speciality

speciality.create = async(req) =>{
  return new Promise((resolve, reject) =>{
    try{
      var speciality_name = req.body.speciality_name;

      const sql =  `INSERT INTO speciality (speciality_name) VALUES ('${speciality_name}')`;
      dbConfig.query(sql, (error, result) =>{
        if(error){
          return reject(error);
        }
        else{
          return resolve(result);
        }
      })
    }catch(err){
      return reject(err);
    }
  })
}

// getall speciality

speciality.getAll = async(req) =>{
  return new Promise((resolve, reject) =>{
    try{
      var group_id = req.params.id;

      const sql =  `SELECT * FROM speciality`;
      dbConfig.query(sql, (error, result) =>{
        if(error){
          return reject(error);
        }
        else{
          return resolve(result);
        }
      })
    }catch(err){
      return reject(err);
    }
  })
}

// edit speciality

speciality.update = async(req) =>{
  return new Promise((resolve, reject) =>{
    try{
      var id = req.params.id;
      var speciality_name = req.body.speciality_name;

      const sql =  `UPDATE speciality SET speciality_name = '${speciality_name}' where id = '${id}'`;
      console.log(sql);
      dbConfig.query(sql, (error, result) =>{
        if(error){
          return reject(error);
        }
        else{
          return resolve(result);
        }
      })
    }catch(err){
      return reject(err);
    }
  })
}

// delete speciality

speciality.delete = async(req) =>{
  return new Promise((resolve, reject) =>{
    try{
      var id = req.params.id;

      const sql =  `DELETE FROM speciality where id = '${id}'`;
      console.log(sql);
      dbConfig.query(sql, (error, result) =>{
        if(error){
          return reject(error);
        }
        else{
          return resolve(result);
        }
      })
    }catch(err){
      return reject(err);
    }
  })
}

// get speciality

speciality.get = async(req) =>{
  return new Promise((resolve, reject) =>{
    try{

      const sql =  `SELECT * FROM speciality`;
      dbConfig.query(sql, (error, result) =>{
        if(error){
          return reject(error);
        }
        else{
          return resolve(result);
        }
      })
    }catch(err){
      return reject(err);
    }
  })
}

speciality.getSingleSpeciality = async(req)=>{
return new Promise((resolve,reject)=>{
try{
const specalityId = req.params.specalityId;
const sql = `SELECT * FROM speciality WHERE id='${specalityId}'`;
dbConfig.query(sql,(err,result)=>{
  if(!err){
    return resolve(result);
  }else{
    return reject(err);
  }
})
}catch(err){
 return reject(err);
}
});  
}

module.exports = speciality;