const dbConfig = require("../database/config");

let iyerBooking = {};

iyerBooking.bookIyer = async (req) => {
  console.log("req.body :>> ", req.body);
  return new Promise((resolve, reject) => {
    try {
      const {
        userId: user_id,
        vendorId,
        servicetype,
        specialInstruction: special_instruction,
        date,
        startTime: start_time,
        endTime: end_time,
        place,
        name,
        contact,
        email,
        address,
        approved = 0,
      } = req.body;

      const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().slice(0, 10);
      };

      const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().slice(0, 19).replace("T", " ");
      };

      const formattedDate = formatDate(date);
      const formattedStartTime = formatDateTime(start_time);
      const formattedEndTime = formatDateTime(end_time);

      const sql = `
        INSERT INTO iyer_booking (
          user_id, vendor_id, servicetype, special_instruction, date, start_time, end_time,
          place, name, contact, email, address,approved
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
      `;

      const values = [
        user_id,
        vendorId,
        servicetype,
        special_instruction,
        formattedDate,
        formattedStartTime,
        formattedEndTime,
        place,
        name,
        contact,
        email,
        address,
        approved,
      ];

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({ status: 200, message: "Iyer booked successfully" });
        }
      });
    } catch (e) {
      console.log(e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

iyerBooking.getallIyerBooking = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM iyer_booking`;

    dbConfig.query(sql, (err, results) => {
      if (err) {
        console.log("Database error:", err);
        return reject({ status: 500, message: "Error occurred" });
      } else {
        return resolve({ status: 200, data: results });
      }
    });
  });
};

iyerBooking.getBookingsByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM iyer_booking WHERE user_id = ?`;
    dbConfig.query(sql, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

iyerBooking.getBookingsByVendorId = async (vendorId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM iyer_booking WHERE vendor_id = ?`;
    dbConfig.query(sql, [vendorId], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

iyerBooking.deleteIyer = async (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      var user_id = req.params.userId;
      const sql = `DELETE FROM iyer_booking WHERE id= '${user_id}' `;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    });
  } catch (err) {
    return reject(err);
  }
};

iyerBooking.updateApproval = async (req, res) => {
  console.log("req.body :>> ", req.body);
  return new Promise((resolve, reject) => {
    try {
      const { id } = req.params;
      1;
      console.log("booki :>> ", id);
      if (!id) {
        return reject({ status: 400, message: "Booking ID is required" });
      }

      const sql = `
        UPDATE iyer_booking
        SET approved = 1
        WHERE id = ?
      `;

      dbConfig.query(sql, [id], (err, result) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 500, message: "Error occurred" });
        } else if (result.affectedRows === 0) {
          return reject({ status: 404, message: "Booking not found" });
        } else {
          return resolve({
            status: 200,
            message: "Booking approved successfully",
          });
        }
      });
    } catch (e) {
      console.log(e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

iyerBooking.getallIyerBookingWithApprove = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT iyer_booking.isAdmin_Approved, iyer_booking.iyer_booking_id as iyerbookingId, iyer_booking.user_id, iyer_booking.country as countryID,iyer_booking.state as stateID,countries.country as Countryname,iyer_booking.state as stateID,states.state as Statename,iyer_booking.district as districtID,districts.district as Districtname,iyer_booking.city as cityID,city.city as Cityname,iyer_booking.area as areaID,
            area.area_name as Areaname,iyer_booking.address as Address,iyer_booking.time as iyerTime,iyer_booking.function_type,iyer_booking.language as languagenumer,iyer_booking.date as iyerdate,functioninsidethetemple.FunctionInsideTheTemple as functioninsidetemple,
   userregister.UserName,languages.language_name as languagename,userregister.Phone as PhoneNumber FROM iyer_booking 
   LEFT JOIN countries ON iyer_booking.country=countries.id 
   LEFT JOIN states ON iyer_booking.state=states.id 
   LEFT JOIN districts ON iyer_booking.district=districts.id 
   LEFT JOIN city ON iyer_booking.city=city.id  
   LEFT JOIN area ON iyer_booking.area=area.area_id 
   LEFT JOIN userregister ON iyer_booking.user_id = userregister.id LEFT JOIN languages ON iyer_booking.iyer_booking_id=languages.language_id WHERE iyer_booking.isAdmin_Approved=1 and iyer_booking.isIyer_Approved=1 ;
   `;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

//get single  with iyerApproved

iyerBooking.getsingleIyerBookingWithApprove = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var iyerBookingId = req.params.iyerBookingId;
      const sql = `SELECT iyer_booking.isAdmin_Approved, iyer_booking.iyer_booking_id as iyerbookingId, iyer_booking.user_id, iyer_booking.country as countryID,iyer_booking.state as stateID,countries.country as Countryname,iyer_booking.state as stateID,states.state as Statename,iyer_booking.district as districtID,districts.district as Districtname,iyer_booking.city as cityID,city.city as Cityname,iyer_booking.area as areaID,iyer_booking.function_type,
   area.area_name as Areaname,iyer_booking.address as Address,iyer_booking.time as iyerTime,iyer_booking.language as languagenumer,iyer_booking.date as iyerdate,
   userregister.UserName,userregister.Phone as PhoneNumber,languages.language_name as languagename FROM iyer_booking 
   LEFT JOIN countries ON iyer_booking.country=countries.id 
   LEFT JOIN states ON iyer_booking.state=states.id 
   LEFT JOIN districts ON iyer_booking.district=districts.id 
   LEFT JOIN city ON iyer_booking.city=city.id  
   LEFT JOIN area ON iyer_booking.area=area.area_id 
   LEFT JOIN userregister ON iyer_booking.user_id = userregister.id LEFT JOIN languages ON iyer_booking.iyer_booking_id=languages.language_id WHERE iyer_booking.isAdmin_Approved=1 and iyer_booking.isIyer_Approved=1 AND iyer_booking.iyer_booking_id = "${iyerBookingId}";
   `;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

//get All with iyerReject

iyerBooking.getallIyerBookingWithReject = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT iyer_booking.isAdmin_Approved, iyer_booking.iyer_booking_id as iyerbookingId, iyer_booking.user_id, iyer_booking.country as countryID,iyer_booking.state as stateID,countries.country as Countryname,iyer_booking.state as stateID,states.state as Statename,iyer_booking.district as districtID,districts.district as Districtname,iyer_booking.city as cityID,city.city as Cityname,iyer_booking.area as areaID,iyer_booking.function_type,
   area.area_name as Areaname,iyer_booking.address as Address,iyer_booking.time as iyerTime,iyer_booking.language as languagenumer,iyer_booking.date as iyerdate,functioninsidethetemple.FunctionInsideTheTemple as functioninsidetemple,
   userregister.UserName,languages.language_name as languagename,userregister.Phone as PhoneNumber FROM iyer_booking 
   LEFT JOIN countries ON iyer_booking.country=countries.id 
   LEFT JOIN states ON iyer_booking.state=states.id 
   LEFT JOIN districts ON iyer_booking.district=districts.id 
   LEFT JOIN city ON iyer_booking.city=city.id  
   LEFT JOIN area ON iyer_booking.area=area.area_id 
   LEFT JOIN userregister ON iyer_booking.user_id = userregister.id LEFT JOIN languages ON iyer_booking.iyer_booking_id=languages.language_id WHERE iyer_booking.isAdmin_Approved=1 and iyer_booking.isIyer_Approved=2;
   `;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
//get single with iyerReject

iyerBooking.getsingleIyerBookingWithReject = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var iyerBookingId = req.params.iyerBookingId;
      const sql = `SELECT iyer_booking.isAdmin_Approved, iyer_booking.iyer_booking_id as iyerbookingId, iyer_booking.user_id, iyer_booking.country as countryID,iyer_booking.state as stateID,countries.country as Countryname,iyer_booking.state as stateID,
            states.state as Statename,iyer_booking.district as districtID,districts.district as Districtname,iyer_booking.city as cityID,city.city as Cityname,iyer_booking.area as areaID,iyer_booking.function_type,
   area.area_name as Areaname,iyer_booking.address as Address,iyer_booking.time as iyerTime,iyer_booking.language as languagenumer,iyer_booking.date as iyerdate,
   userregister.UserName,languages.language_name as languagename,userregister.Phone as PhoneNumber FROM iyer_booking 
   LEFT JOIN countries ON iyer_booking.country=countries.id 
   LEFT JOIN states ON iyer_booking.state=states.id 
   LEFT JOIN districts ON iyer_booking.district=districts.id 
   LEFT JOIN city ON iyer_booking.city=city.id  
   LEFT JOIN area ON iyer_booking.area=area.area_id 
   LEFT JOIN userregister ON iyer_booking.user_id = userregister.id LEFT JOIN languages ON iyer_booking.iyer_booking_id=languages.language_id WHERE iyer_booking.isAdmin_Approved=1 and iyer_booking.isIyer_Approved=2 AND iyer_booking.iyer_booking_id = "${iyerBookingId}";
   `;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.getSingleIyer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var iyerBookingId = req.params.iyerBookingId;
      const sql = `SELECT iyer_booking.iyer_booking_id as iyerbookingId,
            iyer_booking.user_id,
            iyer_booking.country as countryID,
            iyer_booking.state as stateID,
            countries.country as Countryname,
            iyer_booking.state as stateID,
            states.state as Statename,
            iyer_booking.district as districtID,
            districts.district as Districtname,
            iyer_booking.city as cityID,
            city.city as Cityname,
            iyer_booking.area as areaID,
            area.area_name as Areaname,
            iyer_booking.address as Address,
            iyer_booking.time as iyerTime,
            iyer_booking.language as languagenumer,
            iyer_booking.date as iyerdate,
            userregister.UserName,
            languages.language_name as languagename
        FROM iyer_booking
            LEFT JOIN countries ON iyer_booking.country = countries.id
            LEFT JOIN states ON iyer_booking.state = states.id
            LEFT JOIN districts ON iyer_booking.district = districts.id
            LEFT JOIN city ON iyer_booking.city = city.id
            LEFT JOIN area ON iyer_booking.area = area.area_id
            LEFT JOIN userregister ON iyer_booking.user_id = userregister.id
            LEFT JOIN languages ON iyer_booking.language = languages.language_id
        WHERE iyer_booking.iyer_booking_id='${iyerBookingId}'`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.approvedByAdmin = async (req) => {
  return new Promise((resolve, reject) => {
    var iyerbookingId = req.params.iyerbookingId;
    var status = req.body.status;

    try {
      const sql = `UPDATE iyer_booking SET isAdmin_Approved = '${status}' where iyer_booking_id  = '${iyerbookingId}' `;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};
//approveby iyer

iyerBooking.approveByIyer = async (req) => {
  return new Promise((resolve, reject) => {
    var iyerbookingId = req.params.iyerbookingId;
    var status = req.body.status;
    var rejectedReasonByIyer = req.body.rejectedReasonByIyer;

    try {
      const sql = `UPDATE iyer_booking SET isIyer_Approved = '${status}',rejectedReasonByIyer= '${rejectedReasonByIyer}' where iyer_booking_id  = '${iyerbookingId}' `;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

iyerBooking.updateIyerBooking = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var iyerbookingId = req.params.iyerbookingId;
      var status = req.body.status;
      var rejectedReasonByAdmin = req.body.rejectedReasonByAdmin;

      const sql = `UPDATE iyer_booking SET isAdmin_Approved = '${status}',rejectedReasonByAdmin = '${rejectedReasonByAdmin}' where iyer_booking_id = '${iyerbookingId}' `;
      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.getallIyerBookingWithAdminApprove = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT iyer_booking.iyer_booking_id as iyerbookingId, iyer_booking.user_id, iyer_booking.country as countryID,iyer_booking.state as stateID,countries.country as Countryname,iyer_booking.state as stateID,states.state as Statename,iyer_booking.district as districtID,districts.district as Districtname,iyer_booking.city as cityID,city.city as Cityname,iyer_booking.area as areaID,
   area.area_name as Areaname,iyer_booking.address as Address,iyer_booking.time as iyerTime,iyer_booking.function_type,iyer_booking.language as languagenumer,iyer_booking.date as iyerdate,
   userregister.UserName,languages.language_name as languagename, iyer_booking.isAdmin_Approved,iyer_booking.isIyer_Approved,iyer_booking.rejectedReasonByAdmin,iyer_booking.rejectedReasonByIyer FROM iyer_booking 
   LEFT JOIN countries ON iyer_booking.country=countries.id 
   LEFT JOIN states ON iyer_booking.state=states.id 
   LEFT JOIN districts ON iyer_booking.district=districts.id 
   LEFT JOIN city ON iyer_booking.city=city.id  
   LEFT JOIN area ON iyer_booking.area=area.area_id  
   LEFT JOIN userregister ON iyer_booking.user_id = userregister.id LEFT JOIN languages ON iyer_booking.iyer_booking_id=languages.language_id where iyer_booking.isAdmin_Approved=1 and iyer_booking.isIyer_Approved=0`;

      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.getSingleIyerBookingWithAdminApprove = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var iyerBookingId = req.params.iyerBookingId;

      const sql = `SELECT iyer_booking.iyer_booking_id as iyerbookingId, iyer_booking.user_id, iyer_booking.country as countryID,iyer_booking.state as stateID,countries.country as Countryname,iyer_booking.state as stateID,states.state as Statename,iyer_booking.district as districtID,districts.district as Districtname,iyer_booking.city as cityID,city.city as Cityname,iyer_booking.area as areaID,iyer_booking.function_type,iyer_booking.function_name ,functions.FunctionName,
            area.area_name as Areaname,iyer_booking.address as Address,iyer_booking.time as iyerTime,iyer_booking.language as languagenumer,iyer_booking.date as iyerdate,
            userregister.UserName,languages.language_name as languagename,iyer_booking.isAdmin_Approved,iyer_booking.isIyer_Approved,iyer_booking.rejectedReasonByAdmin,iyer_booking.rejectedReasonByIyer FROM iyer_booking 
            LEFT JOIN functions on iyer_booking.function_name = functions.FunctionID
            LEFT JOIN countries ON iyer_booking.country=countries.id 
            LEFT JOIN states ON iyer_booking.state=states.id 
            LEFT JOIN districts ON iyer_booking.district=districts.id 
            LEFT JOIN city ON iyer_booking.city=city.id  
            LEFT JOIN area ON iyer_booking.area=area.area_id 
            LEFT JOIN userregister ON iyer_booking.user_id = userregister.id 
            LEFT JOIN languages ON iyer_booking.iyer_booking_id=languages.language_id 
            where iyer_booking.iyer_booking_id ="${iyerBookingId}" `;

      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.ApprovedIyerCount = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;

    try {
      var sqlforapprove = `select * FROM iyer_booking where  iyer_id = '${id}' and isIyer_Approved=1;select * FROM iyer_booking where iyer_id = '${id}' and isIyer_Approved=2;select * FROM iyer_booking where  iyer_id = '${id}' and isIyer_Approved=0`;

      dbConfig.query(sqlforapprove, [1, 2, 3], (err, result) => {
        console.log(result, "data");
        var approved = result[0].length;
        var rejected = result[1].length;
        var pending = result[2].length;
        var status = {
          approved: approved,
          rejected: rejected,
          pending: pending,
        };
        if (err) {
          return reject(err);
        } else {
          // return resolve({status:200,message:"updated successfully"});
          return resolve(status);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.ApprovedIyerCount = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;

    try {
      var sqlforapprove = `select * FROM iyer_booking where  iyer_id = '${id}' and isIyer_Approved=1;select * FROM iyer_booking where iyer_id = '${id}' and isIyer_Approved=2;select * FROM iyer_booking where  iyer_id = '${id}' and isIyer_Approved=0`;

      dbConfig.query(sqlforapprove, [1, 2, 3], (err, result) => {
        console.log(result, "data");
        var approved = result[0].length;
        var rejected = result[1].length;
        var pending = result[2].length;
        var status = {
          approved: approved,
          rejected: rejected,
          pending: pending,
        };
        if (err) {
          return reject(err);
        } else {
          // return resolve({status:200,message:"updated successfully"});
          return resolve(status);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.getIyerbookingDataFromAdmin = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const status = req.params.status;
      const iyerstatus = req.params.iyerstatus;
      //old
      // let sql = `SELECT iyer_booking.*, userregister.UserName ,iyer_booking.function_type
      // FROM iyer_booking

      // LEFT JOIN userregister ON userregister.id = iyer_booking.user_id
      // LEFT JOIN functions ON functions.FunctionID = iyer_booking.function_name
      // `;

      //new
      let sql = `SELECT iyer_booking.iyer_id,iyer_booking.iyer_booking_id,
            priest_function.function_name,
            function_type.function_type,
            userregister.UserName
            FROM iyer_booking
            LEFT JOIN priest_function ON iyer_booking.function_name = priest_function.id
            LEFT JOIN userregister ON userregister.id = iyer_booking.user_id
            LEFT JOIN function_type ON iyer_booking.function_type = function_type.id`;

      if (status || iyerstatus) {
        sql += " WHERE";
      }
      if (status) {
        sql += ` iyer_booking.isAdmin_Approved = '${status}'`;
      }
      if (status && iyerstatus) {
        sql += " and";
      }
      if (iyerstatus) {
        sql += ` iyer_booking.isIyer_Approved = '${iyerstatus}'`;
      }

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
iyerBooking.updateRejectedIyer = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      var rejectedIyer = req.body.rejectedIyer;
      var iyerbookingId = req.params.iyerbookingId;
      const sql = `UPDATE iyer_booking SET RejectedIyer="${rejectedIyer}" WHERE iyer_booking_id="${iyerbookingId}"`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
iyerBooking.updateAssignIyer = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      var iyer_id = req.body.iyer_id;
      var iyerbookingId = req.params.iyerbookingId;

      var sql = `UPDATE iyer_booking SET iyer_id= "${iyer_id}", isAdmin_Approved = "1" WHERE iyer_booking_id="${iyerbookingId}"`;
      console.log(sql);
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.updateprice = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var iyer_booking_id = req.params.iyer_booking_id;
      var price = req.body.price;
      const sql = `UPDATE iyer_booking SET price = '${price}' where iyer_booking_id  = '${iyer_booking_id}' `;
      console.log(sql);
      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

iyerBooking.getIyeridAcceptOrders = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var iyer_id = req.params.iyer_id;
      var isIyer_Approved = req.params.isIyer_Approved;

      var sql = `SELECT iyer_booking.*,userregister.* FROM  iyer_booking 
            LEFT JOIN userregister ON userregister.id = iyer_booking.user_id WHERE iyer_booking.iyer_id = '${iyer_id}' and iyer_booking.isAdmin_Approved = 1 and iyer_booking.isIyer_Approved = '${isIyer_Approved}'`;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = iyerBooking;
