const dbConfig = require("../database/config");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
let iyer = {};
iyer.register = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(req.body, "register");

      const {
        name,
        country,
        state,
        district,
        city,
        inside_temple,
        outside_temple,
        area,
        aboutyourself,
        pincode,
        phone,
        secondary_number,
        whatsapp_number,
        email,
        password,
        language_name,
      } = req.body;

      const hash = bcrypt.hashSync(password, 10);

      const sql = `INSERT INTO iyer (
        name, country, state, district, city,
        area, aboutyourself, pincode, phone, inside_temple,
        outside_temple, secondary_number, whatsapp_number, email, password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const sqlCheck = `SELECT * FROM iyer WHERE phone = ?`;

      dbConfig.query(sqlCheck, [phone], (err, result) => {
        if (err) {
          console.error("Database error during phone check:", err);
          return reject({
            status: 409,
            status: "Failed",
            message: "Unexpected error occurred",
          });
        }
        if (result.length === 0) {
          dbConfig.query(
            sql,
            [
              name,
              country,
              state,
              district,
              city,
              area,
              aboutyourself,
              pincode,
              phone,
              inside_temple,
              outside_temple,
              secondary_number,
              whatsapp_number,
              email,
              hash,
              language_name,
            ],
            (err, result) => {
              console.log(err, "sql");

              if (err) {
                return reject({
                  status: "Failed",
                  message: "Error Occurred",
                });
              } else {
                let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY);
                return resolve({
                  message: "Iyer created successfully",
                  ID: result.insertId,
                  token: token,
                  status: "Success",
                });
              }
            }
          );
        } else {
          return reject({ status: "Failed", message: "Iyer already exists" });
        }

        dbConfig.query(
          [
            name,
            country,
            state,
            district,
            city,
            area,
            aboutyourself,
            pincode,
            phone,
            inside_temple,
            outside_temple,
            secondary_number,
            whatsapp_number,
            email,
            hash,
            language_name,
          ],
          (err, result) => {
            if (err) {
              console.error("Database error during insertion:", err);
              return reject({
                status: 500,
                message: "Database error during insertion",
                error: err, // Add this line to include the error details
              });
            }

            let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY);
            return resolve({
              status: 201,
              message: "Iyer created successfully",
              ID: result.insertId,
              token: token,
            });
          }
        );
      });
    } catch (e) {
      console.error("Unexpected error:", e);
      return reject({
        status: 500,
        message: "Unexpected error occurred, please re-enter details",
        error: e, // Add this line to include the error details
      });
    }
  });
};

// iyer.register = async (req, res) => {
//   return new Promise((resolve, reject) => {
//     try {
//       console.log(req.body, "register");
//       const name = req.body.name;
//       const country = req.body.country;
//       const state = req.body.state;
//       const district = req.body.district;
//       const city = req.body.city;
//       const language_name = req.body.language_name;
//       const inside_temple = req.body.inside_temple.replace(/"/g, "'");

//       const outside_temple = req.body.outside_temple.replace(/"/g, "'");

//       const area = req.body.area;
//       const aboutyourself = req.body.aboutyourself;
//       const pincode = req.body.pincode;
//       const phone = req.body.phone || "";
//       const secondary_number = req.body.secondary_number || "";
//       const whatsapp_number = req.body.whatsapp_number || "";
//       const email = req.body.email || "";
//       var password = req.body.password;
//       const hash = bcrypt.hashSync(password, 10);
//       password = hash;
//       console.log(whatsapp_number, secondary_number, phone, "numbers");
//       const sql = `INSERT INTO iyer(
//             name,country,state,district,city,
//             area,aboutyourself,phone,inside_temple,
//             outside_temple,secondary_number,whatsapp_number,email,password,language_name)
//             VALUES("${name}","${country}","${state}","${district}","${city}","${area}",
//             "${aboutyourself}","${phone}","${inside_temple}","${outside_temple}",
//             "${secondary_number}","${whatsapp_number}","${email}","${password}","${language_name}","${pincode}")`;
//             const sql2 = `SELECT * FROM iyer WHERE phone="${phone}"`;
//             dbConfig.query(sql2, (err, result) => {
//               console.log(result.length !== 0);
//               if (err) {
//                 return reject({
//                   status: 409,
//                   status: "Failed",
//                   message: "Unexpected error occcccc",
//                 });
//               }
//               if (result.length == 0) {
//                 dbConfig.query(sql, (err, result) => {
//             console.log(err, "sql");

//             if (err) {
//               return reject({
//                 status: "Failed",
//                 message: "Error Occured",
//               });
//             } else {
//               let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY);
//               return resolve({
//                 message: "iyer created sucessfully",
//                 ID: result.insertId,
//                 token: token,
//                 status: "Success",
//               });
//             }
//           });
//         } else {
//           return reject({ status: "Failed", message: "Iyer already exists" });
//         }
//       });
//     } catch (e) {
//       return reject({
//         status: "Failed",
//         message: "Error occured please renter details",
//       });
//     }
//   });
// };

iyer.login = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const phone = req.body.phone;
      var password = req.body.password;

      var sql = `SELECT * FROM iyer WHERE phone = "${phone}"`;
      dbConfig.query(sql, (err, user) => {
        if (err) {
          return reject({ status: 500, message: err });
        } else {
          if (user.length == 0) {
            return resolve({
              status: "Failed",
              message: "Phone number doesn't exist",
            });
          } else {
            sql += `and isApproved = "1"`;
            dbConfig.query(sql, (err1, user1) => {
              if (err1) {
                return reject({ status: 500, message: err1 });
              } else {
                if (user1.length == 0) {
                  return resolve({
                    status: 404,
                    message: "Waiting for admin approval",
                  });
                } else {
                  const hashedPassword = user[0].password;
                  if (bcrypt.compareSync(password, hashedPassword)) {
                    const token = jwt.sign(
                      { phone: user[0].phone },
                      process.env.SECRET_KEY
                    );
                    return resolve({
                      id: user[0].id,
                      token: token,
                      role: "iyer",
                    });
                  } else {
                    return reject({
                      status: "Failed",
                      message: "Password Incorrect",
                    });
                  }
                }
              }
            });
          }
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};
iyer.getAllIyer = (req, res) => {
  try {
    dbConfig.query(
      "SELECT iyer.id as iyerId,iyer.name as iyername,iyer.country as countryID,iyer.imageUrl as imageUrl,countries.country as iyerCountry,iyer.state as stateID,states.state as iyerState,iyer.district as districtID,districts.district as iyerDistrict,iyer.city as cityID,city.city as iyerCity,iyer.area as areaID,area.area_name as iyerArea,iyer.pincode as iyerPincode,iyer.phone as iyerPhone,iyer.reviewData as iyerReviewData,iyer.address as iyerAddress,iyer.inside_temple as iyerInsidetemple,iyer.language_name as languagename,iyer.outside_temple as iyerOutsidetemple,iyer.secondary_number as iyerSecondarynumber,iyer.whatsapp_number as iyerWhatsappnumber,iyer.email as iyerEmail FROM iyer LEFT JOIN countries ON iyer.country=countries.id LEFT JOIN states ON iyer.state=states.id LEFT JOIN districts ON iyer.district=districts.id LEFT JOIN city ON iyer.city=city.id  LEFT JOIN area ON iyer.area=area.area_id;",
      (err, rows) => {
        if (!err) {
          // console.log(rows, "iyer");
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (err) {
    return reject(err);
  }
};
iyer.getOneIyer = async (req, res) => {
  return new Promise((resolve, reject) => {
    var iyerId = req.params.iyerId;
    const sql = `SELECT iyer.iyer_id as iyerId,iyer.name as iyername,iyer.country as countryID,countries.country as iyerCountry,iyer.state as stateID,states.state as iyerState,iyer.district as districtID,districts.district as iyerDistrict,iyer.city as cityID,city.city as iyerCity,iyer.area as areaID,
         area.area_name as iyerArea,iyer.pincode as iyerPincode,iyer.phone as iyerPhone,iyer.inside_temple as iyerInsidetemple,iyer.outside_temple as iyerOutsidetemple,iyer.secondary_number as iyerSecondarynumber,iyer.whatsapp_number as iyerWhatsappnumber,
         iyer.email as iyerEmail,iyer.isApproved as iyerIsapproved FROM iyer LEFT JOIN countries ON iyer.country=countries.id LEFT JOIN states ON iyer.state=states.id LEFT JOIN districts ON iyer.district=districts.id LEFT JOIN city ON iyer.city=city.id  LEFT JOIN area ON iyer.area=area.area_id WHERE iyer_id='${iyerId}';`;
    dbConfig.query(sql, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};
iyer.deleteIyer = async (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      var iyerId = req.params.iyerId;
      const sql = `DELETE FROM iyer WHERE iyer_id= '${iyerId}' `;
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

iyer.getIyerDetail = async (req, res) => {
  return new Promise((resolve, reject) => {
    var iyerId = req.params.iyerId;
    const sql = `SELECT iyer.iyer_id as iyerId,iyer.name as iyername,iyer.country as countryID,countries.country as iyerCountry,iyer.state as stateID,states.state as iyerState,iyer.district as districtID,districts.district as iyerDistrict,iyer.city as cityID,city.city as iyerCity,iyer.area as areaID,
        area.area_name as iyerArea,iyer.address as iyerAddress,iyer.pincode as iyerPincode,iyer.phone as iyerPhone,iyer.inside_temple as iyerInsidetemple,iyer.outside_temple as iyerOutsidetemple,iyer.secondary_number as iyerSecondarynumber,iyer.whatsapp_number as iyerWhatsappnumber,
        iyer.email as iyerEmail,iyer.isApproved as iyerIsapproved FROM iyer LEFT JOIN countries ON iyer.country=countries.id LEFT JOIN states ON iyer.state=states.id LEFT JOIN districts ON iyer.district=districts.id LEFT JOIN city ON iyer.city=city.id  LEFT JOIN area ON iyer.area=area.area_id WHERE iyer_id='${iyerId}';`;
    dbConfig.query(sql, (err, result) => {
      if (!err) {
        return res.send(rows);
      } else {
        return reject(err);
      }
    });
  });
};

iyer.getIyerDetail = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      console.log(id);
      const sql = `SELECT * FROM iyer WHERE iyer_id = "${id}"`;
      dbConfig.query(sql, (err, user) => {
        console.log(user, "user");
        if (err) {
          return reject({ status: 500, message: err });
        } else {
          return resolve(user);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};
iyer.getIyerListCity = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var cityid = req.params.cityid;
      var function_name = req.params.function_id;
      var sql = `SELECT * FROM iyer WHERE city = ${cityid} `;
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

iyer.getIyerList = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var cityid = req.params.cityid;
      var function_name = req.params.function_id;
      console.log(cityid, function_name, "data");
      var sql = `SELECT * FROM iyer WHERE city = ${cityid} and FIND_IN_SET (${function_name}, function_name)`;
      console.log((sql, "sql1"));
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

//approve iyer

exports.iyerApproveId = (_req, res) => {
  dbConfig.query(
    "SELECT * FROM `iyer` WHERE `isApproved` = 1",
    (err, rows, _field) => {
      if (!err) {
        res.status(200).json({
          status: "Success",
          message: "Required Approved Temple is fetched ",
          results: rows,
        });
      } else {
        res.status(500).json({
          status: "Failed",
          message: "Something wrong happened ",
        });
      }
    }
  );
};

module.exports = iyer;
