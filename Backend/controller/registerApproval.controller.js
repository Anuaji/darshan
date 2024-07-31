const dbConfig = require("../database/config");
require("dotenv").config();

let approval = {};

// approval.iyer = async (req) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const sql = `SELECT iyer.iyer_id, iyer.name, iyer.isApproved FROM iyer`;

//       dbConfig.query(sql, (err, result) => {
//         if (err) {
//           return reject(err);
//         } else {
//           return resolve(result);
//         }
//       });
//     } catch (err) {
//       return reject(err);
//     }
//   });
// };

approval.iyer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM iyer`;

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

approval.vendor = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM vendors`;

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

approval.user = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM site_user`;

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
approval.guide = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM guide_register`;

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

approval.trainer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM trainer_register`;

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

approval.astrologer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM astrologer`;

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

// get single user

approval.singleIyer = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    console.log('id', id)

    try {
      const sql = `SELECT iyer.iyer_id, iyer.name, iyer.aboutyourself,
                iyer.pincode, iyer.phone, iyer.secondary_number, iyer.language_name,
                iyer.whatsapp_number, iyer.email, countries.country, states.state,
                districts.district, city.city, area.area_name, inside_temple.temple_pooja as inside_pooja,
                outside_temple.temple_pooja as outside_pooja
             
                FROM iyer 
                LEFT JOIN countries on iyer.country = countries.id  
                LEFT JOIN states on iyer.state = states.id
                LEFT JOIN districts on iyer.district = districts.id
                LEFT JOIN city on iyer.city = city.id
                LEFT JOIN area on iyer.area = area.area_id
                LEFT JOIN inside_temple on iyer.inside_temple = inside_temple.id
                LEFT JOIN outside_temple on iyer.outside_temple = outside_temple.id
           
                where iyer.iyer_id = ${id} `;

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

approval.singleVendor = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;

    try {
      const sql = `SELECT 
                vendors.vendor_id, vendors.vendor_name, vendors.business_name,
                vendors.phone_number, vendors.address, vendors.pincode, vendors.isApproved,   
                countries.country, states.state,
                districts.district, city.city, area.area_name
                FROM vendors 
                LEFT JOIN countries on vendors.country_code_id = countries.id  
                LEFT JOIN states on vendors.state_id = states.id
                LEFT JOIN districts on vendors.district_id = districts.id
                LEFT JOIN city on vendors.city_id = city.id
                LEFT JOIN area on vendors.area_id = area.area_id
                where vendors.vendor_id = ${id}`;

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

approval.singleUser = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;

    try {
      const sql = `SELECT 
                userregister.id, userregister.UserName, userregister.Pincode,
                userregister.EmailId, userregister.Phone ,userregister.isApproved,   
                countries.country, states.state,
                districts.district, city.city, area.area_name
                FROM site_user as userregister
                LEFT JOIN countries on userregister.CountryId = countries.id  
                LEFT JOIN states on userregister.StateId = states.id
                LEFT JOIN districts on userregister.DistrictId = districts.id
                LEFT JOIN city on userregister.CityId = city.id
                LEFT JOIN area on userregister.AreaId = area.area_id 
                where userregister.id = ${id}`;

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

approval.singleGuide = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;

    try {
      // const sql = `SELECT
      // userregister.guide_id, userregister.guideName, userregister.pincode,
      // userregister.EmailId, userregister.Phone, userregister.isApproved,
      // countries.countryId, states.stateId,
      // districts.districtId, city.city, area.area_name
      // FROM guide_register as userregister
      // LEFT JOIN countries on userregister.countryId = countries.id
      // LEFT JOIN states on userregister.stateId = states.id
      // LEFT JOIN districts on userregister.districtId = districts.id
      // LEFT JOIN city on userregister.cityId = city.id
      // LEFT JOIN area on userregister.areaId = area.area_id
      // where guide_register.guide_id = ${id}`;

      const sql = `SELECT 
                guideregister.guide_id, guideregister.guideName, guideregister.pincode,
                guideregister.emailId, guideregister.phone,guideregister.language_knows, guideregister.isApproved,   
                countries.country, states.state,
                districts.district, city.city, area.area_name   
                FROM guide_register as guideregister   
                LEFT JOIN countries on guideregister.countryId = countries.id  
                LEFT JOIN states on guideregister.stateId = states.id
                LEFT JOIN districts on guideregister.districtId = districts.id
                LEFT JOIN city on guideregister.cityId = city.id
                LEFT JOIN area on guideregister.areaId = area.area_id  
                where guideregister.guide_id = ${id}`;

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

approval.singleTrainer = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;

    try {
      const sql = `SELECT 
                trainer_register.trainer_id, trainer_register.trainerName, trainer_register.businessName,
                trainer_register.address, trainer_register.pincode, trainer_register.Phone, trainer_register.isApproved,   
                countries.country, states.state,
                districts.district, city.city, area.area_name
                FROM trainer_register 
                LEFT JOIN countries on trainer_register.countryId = countries.id  
                LEFT JOIN states on trainer_register.stateId = states.id
                LEFT JOIN districts on trainer_register.districtId = districts.id
                LEFT JOIN city on trainer_register.cityId = city.id
                LEFT JOIN area on trainer_register.areaId = area.area_id 
                where trainer_register.trainer_id = ${id}`;

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

approval.singleAstrologer = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;

    try {
      const sql = `SELECT 
                astrologer.id, astrologer.AstrologerName, astrologer.Address, astrologer.Pincode,
                astrologer.SecondaryNumber, astrologer.WhatsappNumber,
                astrologer.EmailId, astrologer.Phone, astrologer.isApproved,   
                countries.country, states.state,
                districts.district, city.city, area.area_name
                FROM astrologer 
                LEFT JOIN countries on astrologer.CountryId = countries.id  
                LEFT JOIN states on astrologer.StateId = states.id
                LEFT JOIN districts on astrologer.DistrictId = districts.id
                LEFT JOIN city on astrologer.CityId = city.id
                LEFT JOIN area on astrologer.AreaId = area.area_id 
                where astrologer.id = ${id}`;

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

// update

approval.updateIyer = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;
    var reason = req.body.reason;

    try {
      var sql;
      if (status == 2) {
        sql = `UPDATE iyer SET isApproved = '${status}', rejectReasonByAdmin = '${reason}' where iyer_id = '${id}' `;
      } else {
        sql = `UPDATE iyer SET isApproved = '${status}' where iyer_id = '${id}' `;
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

approval.updateVendor = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;
    var reason = req.body.reason;

    try {
      var sql;
      if (status == 2) {
        sql = `UPDATE vendors SET isApproved = '${status}', rejectReasonByAdmin = '${reason}'  where vendor_id = '${id}' `;
      } else {
        sql = `UPDATE vendors SET isApproved = '${status}' where vendor_id = '${id}' `;
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

approval.updateUser = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;
    var reason = req.body.reason;

    try {
      var sql;
      if (status == 2) {
        sql = `UPDATE site_user SET isApproved = '${status}', rejectReasonByAdmin = '${reason}'  where id = '${id}' `;
      } else {
        sql = `UPDATE site_user SET isApproved = '${status}' where id = '${id}'`;
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

approval.updateGuide = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;
    var reason = req.body.reason;

    try {
      var sql;
      if (status == 2) {
        sql = `UPDATE guide_register SET isApproved = '${status}', rejectReasonByAdmin = '${reason}'  where guide_id = '${id}' `;
      } else {
        sql = `UPDATE guide_register SET isApproved = '${status}' where guide_id = '${id}'`;
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

approval.updateTrainer = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;
    var reason = req.body.reason;

    try {
      var sql;
      if (status == 2) {
        sql = `UPDATE trainer_register SET isApproved = '${status}', rejectReasonByAdmin = '${reason}'  where trainer_id = '${id}' `;
      } else {
        sql = `UPDATE trainer_register SET isApproved = '${status}' where trainer_id = '${id}'`;
      }

      // const sql = `UPDATE trainer_register SET isApproved = '${status}'  rejectReasonByAdmin = '${reason}' where trainer_id = '${id}' `;

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

approval.updateAstrologer = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;

    try {
      const sql = `UPDATE astrologer SET isApproved = '${status}' where id = '${id}' `;

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

module.exports = approval;
