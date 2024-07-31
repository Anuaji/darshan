const dbConfig = require('../database/config');
require('dotenv').config();

let filter = {};

filter.filterEvents = async(req) =>{
    return new Promise((resolve, reject)=>{
        try{
            var date = req.body.date;
            // let time = new Date();
            // console.log(time.split('T')[1]);
            const sql = `SELECT * FROM temple_event where event_startdate <= '${date}' AND event_enddate >= '${date}'`;
            console.log(sql);
            dbConfig.query(sql, (error, result)=>{
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

filter.categoryFilter = async(req) =>{
    return new Promise((resolve, reject)=>{
        try{
            var cat_id = req.params.id;
            const sql = `SELECT temple_event.*, blogandeventcategories.* FROM temple_event
            LEFT JOIN blogandeventcategories ON temple_event.category=blogandeventcategories.id
            WHERE temple_event.category = ${cat_id}`;
            console.log(sql);
            dbConfig.query(sql, (error, result)=>{
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

module.exports = filter;