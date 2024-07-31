const dbConfig = require('../database/config');

const eventType = {};

eventType.create = async (req) =>{
    return new Promise((resolve, reject)=>{
        try{
            const eventType =req.body.eventType;
           const sql=`INSERT INTO eventtype (event_type) VALUES("${eventType}");`;
           dbConfig.query(sql, (error, result) =>{
               if(error){
                   return reject(error);
               }else{
                   return resolve(result);
               }
           })
        }catch(error){
            return reject(error);
        }
    })
}


eventType.getAllEventTypes = async () =>{
    return new Promise((resolve, reject)=>{
        try{
           const sql=`SELECT * FROM eventtype;`;
           dbConfig.query(sql, (error, result) =>{
               if(error){
                   return reject(error);
               }else{
                   return resolve(result);
               }
           })
        }catch(error){
            return reject(error);
        }
    })
}


eventType.getSingleEventType = async (req) =>{
    return new Promise((resolve, reject)=>{
        try{
            const eventTypeId = req.params.eventTypeId;
           const sql=`SELECT * FROM eventtype WHERE id="${eventTypeId}";`;
           dbConfig.query(sql, (error, result) =>{
               if(error){
                   return reject(error);
               }else{
                   return resolve(result);
               }
           })
        }catch(error){
            return reject(error);
        }
    })
}



eventType.updateEventType = async (req) =>{
    return new Promise((resolve, reject)=>{
        try{
            const eventTypeId = req.params.eventTypeId;
            const eventType =req.body.eventType;
           const sql=`UPDATE eventtype SET event_type="${eventType}" WHERE id="${eventTypeId}";`;
           dbConfig.query(sql, (error, result) =>{
               if(error){
                   return reject(error);
               }else{
                   return resolve(result);
               }
           })
        }catch(error){
            return reject(error);
        }
    })
}


eventType.deleteEventType = async (req) =>{
    return new Promise((resolve, reject)=>{
        try{
            const eventTypeId = req.params.eventTypeId;
           const sql=`DELETE FROM eventtype WHERE id ="${eventTypeId}"`;
           dbConfig.query(sql, (error, result) =>{
               if(error){
                   return reject(error);
               }else{
                   return resolve(result);
               }
           })
        }catch(error){
            return reject(error);
        }
    })
}


module.exports = eventType;