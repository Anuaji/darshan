const dbConfig = require('../database/config');

const astrologerBooking = {};

astrologerBooking.create = async (req) => {
    return new Promise((resolve, reject) => {
        try{
           const userId = req.body.userId;
           const countryId = req.body.countryId;
           const stateId = req.body.stateId;
           const districtId = req.body.districtId;
           const cityId = req.body.cityId;
           const areaId = req.body.areaId;
           const bookingDate = req.body.bookingDate;
           const bookingTime = req.body.bookingTime;
           const astrologerPreferedLanguage = req.body.astrologerPreferedLanguage;
           const isAdminApproved = req.body.isAdminApproved;
           const isAstrologerApproved = req.body.isAstrologerApproved;

           const sql = `INSERT INTO astrologerbookings (userId,countryId,stateId,districtId,cityId,areaId,
            bookingDate,bookingTime,astrologerPreferedLanguage,isAdminApproved,isAstrologerApproved) VALUES("${userId}","${countryId}",
            "${stateId}","${districtId}","${cityId}","${areaId}","${bookingDate}","${bookingTime}","${astrologerPreferedLanguage}",
            "${isAdminApproved}","${isAstrologerApproved}");`;
            dbConfig.query(sql,(err, result) => {
                if(err){
                    return reject(err);
                }else{
                    return resolve({status:200,message:"order placed successfully"});
                    // return resolve(result);
                }
            })
        }catch(error){
            console.log(error);
            return reject({status:500,message:"Internal server error"});
        }
    })
}


astrologerBooking.getAllBookingWithAdminApproved = async () => {
    return new Promise ((resolve, reject) => {
         try{
             const sql = `SELECT astrologerbookings.id as BookingID,astrologerbookings.userId as UserID,userregister.UserName as UserName FROM astrologerbookings LEFT JOIN userregister ON astrologerbookings.userId= userregister.id WHERE astrologerbookings.isAdminApproved = 1` ;
 
             dbConfig.query(sql,(err,result) => {
                 if(err){
                     return reject(err);
                 }else{
                     return resolve(result);
                 }
             })
 
         }catch(error){
             console.log("Error!",error);
             return reject({status:500, message:"Internal Server Error"});
         }
     })
 }


 astrologerBooking.updateIsAdminApproveStatus = async(req) =>{
    return new Promise((resolve, reject)=>{
        var id = req.params.id;
        var status = req.body.status;
        var rejectedReasonByAdmin =req.body.rejectedReasonByAdmin;

        try{
        //  console.log(rejectedReasonByAdmin,"rejectedReasonByAdmin");
                const sql = `UPDATE astrologerbookings SET isAdminApproved = '${status}',rejectedReasonByAdmin = '${rejectedReasonByAdmin}'  where id = '${id}' `;
                dbConfig.query(sql, (err, result)=>{
                    if(err){
                        return reject(err);
                    }
                    else{
                        return resolve(result);
                    }
                });

        }catch(err){
            return reject(err);
        }
    })
}

astrologerBooking.updateAstrologerApproveStatus = async(req) =>{
    return new Promise((resolve, reject)=>{
        var id = req.params.id;
        var status = req.body.status;
 

        try{
 
            const sql = `UPDATE astrologerbookings SET isAdminApproved = '${status}' where id  = '${id}' `;

                dbConfig.query(sql, (err, result)=>{
                    if(err){
                        return reject(err);
                    }
                    else{
                        return resolve({status:200,message:"updated successfully"});
                        // return resolve(result);
                    }
                });

        }catch(err){
            return reject(err);
        }
    })
}



astrologerBooking.getAllBookings = async () => {
   return new Promise ((resolve, reject) => {
        try{
            const sql = `SELECT astrologerbookings.id as BookingID,astrologerbookings.userId as UserID, astrologerbookings.isAdminApproved as isAdminApproved, astrologerbookings.isAstrologerApproved as isAstrologerApproved, astrologerbookings.rejectedReasonByAdmin as rejectedReasonByAdmin, userregister.UserName as UserName  FROM astrologerbookings LEFT JOIN userregister ON astrologerbookings.userId= userregister.id` ;

            dbConfig.query(sql,(err,result) => {
                if(err){
                    return reject(err);
                }else{
                    return resolve(result);
                }
            })

        }catch(error){
            console.log("Error!",error);
            return reject({status:500, message:"Internal Server Error"});
        }
    })
}
astrologerBooking.getBookingDeatils = async (params) => {
    return new Promise ((resolve, reject) => {
         try{
             const bookingID = params.bookingID;
             const sql = `SELECT astrologerbookings.id as BookingID,astrologerbookings.userId as UserID,userregister.UserName as UserName,
             astrologerbookings.countryId as CountryID,countries.country as CountryName,astrologerbookings.stateId as StateID,
             states.state as StateName,astrologerbookings.districtId as DistrictID,districts.district as DistrictName,
             astrologerbookings.cityId as CityId,city.city as CityName,astrologerbookings.areaId as AreaID,area.area_name as AreaName,
             astrologerbookings.bookingDate as BookingDate,astrologerbookings.bookingTime as BookingTime,
             astrologerbookings.astrologerPreferedLanguage as AstrologerPreferedLanguage FROM astrologerbookings
             LEFT JOIN userregister ON astrologerbookings.userId= userregister.id 
             LEFT JOIN countries ON astrologerbookings.countryId = countries.id LEFT JOIN states ON astrologerbookings.stateId=states.id
             LEFT JOIN districts ON astrologerbookings.districtId = districts.id 
             LEFT JOIN city ON astrologerbookings.cityId = city.id LEFT JOIN area ON astrologerbookings.areaId = area.area_id 
             WHERE astrologerbookings.id="${bookingID}";`;
 
             dbConfig.query(sql,(err,result) => {
                 if(err){
                     return reject(err);
                 }else{
                     return resolve(result);
                 }
             })
 
         }catch(error){
             console.log("Error!",error);
             return reject({status:500, message:"Internal Server Error"});
         }
     })
 }
 

module.exports = astrologerBooking;

