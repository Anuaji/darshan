const dbConfig = require('../database/config');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const jwt = require("jsonwebtoken");

// let guide = {};


exports.registerGuide = async (req, res) => {
  try {
     const name = req.body.name;
     const language_knows = req.body.language_knows;
     const country = req.body.country;
     const state = req.body.state;
     const district = req.body.district;
     const city = req.body.city;
     const area = req.body.area;
     const address = req.body.address;
     const pincode = req.body.pincode;
     const phone = req.body.phone;
     const emailId=req.body.emailId;
     const aboutme = req.body.aboutme;
     var password = req.body.password;
     const hash = bcrypt.hashSync(password, 10);
     // password = hash;
     const query = `INSERT INTO guide_register(guideName,language_knows,countryId,stateId,districtId,cityId,areaId,address,pincode,phone,emailId,aboutme,password)
     VALUES("${name}","${language_knows}","${country}","${state}","${district}","${city}","${area}","${address}","${pincode}","${phone}","${emailId}","${aboutme}","${hash}")`;
 
     dbConfig.query(query, (err, rows) => {
       if (err?.code === "ER_DUP_ENTRY") {
         if (err.sqlMessage?.includes("phone")) {
           return res.status(409).json({
             status: "Failed",
             message: "Phone number is already taken!",
           });
         }
         if (err.sqlMessage?.includes("guideName")) {
           return res.status(409).json({
             status: "Failed",
             message: "guide Name is already taken!",
           });
         }
       }
 
       if (err) {
         return res.status(400).json({ err, status: "Failed" });
       }
       res.json({
         status: "Success",
         result: rows,
         message: "Registration is successful please wait for admin confirmation",
       });
     });
   } catch (error) {
     res.status(500).json({ status: "Failed", error });
   }
 };



exports.login = (req, res) => {
    try {
      console.log("req", req.body);
      dbConfig.query(
        `SELECT * FROM guide_register WHERE phone = "${req.body.phone}"`,
         (err, rows )=> 
          
        {
          if (rows?.length > 0) {
            const user = rows[0];
  
            if (!err) {
              const password = bcrypt.compareSync(
                req.body.password,
                user.password
              );
  
              if (user?.isApproved != 1) {
                return res
                  .status(403)
                  .json({ status: "Failed", message: "Admin need's to approve" });
              }
  
              if (password) {
                const token = jwt.sign(
                  { phone: user?.phone },
                  process.env.JWT_SECRET_KEY,
                  {
                    expiresIn: 60 * 60,
                  }
                );
  
                // res.status(200).send({ id: rows[0].id, token: token, role: 'user' });
                return res
                  .cookie("jwt", token, { maxAge: "3600000", httpOnly: true })
                  .json({
                    id:user?.guide_id,
                    token: token,
                    status: "Success",
                    message: "Login successful",
                    data: {
                      phone: user?.phone,
                      isAuthenticated: true,
                    },
                  });
                
              } else {
                return res
                  .status(500)
                  .json({ status: "Failed", message: "Something went wrong" });
              }
            }
          } else {
            // res.send({ message: "User Does not Exist" });
            return res
              .status(402)
              .json({ status: "Failed", message: "User does not exist" });
          }
        }
      );
    } 
    catch (error) {
      res.status(500).json({ status: "Failed", message: "Something went wrong" });
    }
  };
  exports.getoneGuide = (req, res) => {
    try {
      dbConfig.query(
        `SELECT * FROM guide_register WHERE guide_id = "${req.params.id}"`,
        (err, rows, fields) => {
          if (!err) {
            res.send(rows);
          } else {
            console.log(err);
          }
        }
      );
    } catch (e) {
      throw e;
    }
  };

  exports.updateUser = (req, res) => {
    console.log('firstsdsss', req)
    try {
      const userName = req.body.guideName;
      const language_knows = req.body.language_knows;
      const country = req.body.countryId;
      const state = req.body.stateId;
      const district = req.body.districtId;
      const city = req.body.cityId;
      const area = req.body.areaId;
      const pincode = req.body.pincode;
      const emailId = req.body.emailId;
      const aboutme = req.body.aboutme;
      const phone = req.body.phone;
      const password = req.body.Password;
  
      const sql = `UPDATE guide_register SET guideName= "${userName}",countryId = '${
        country || 0
      }',stateId = '${state || 0}',districtId = '${
        district || 0
      }',cityId = '${city || 0}',areaId = '${
        area || 0
      }',language_knows='${language_knows || 0 }',aboutme = '${aboutme ||0}',pincode = "${pincode}",EmailId = "${emailId}",phone = "${phone}",password = "${password}" WHERE guide_id = '${
        req.params?.id
      }';`;
      console.log('sqlsql', sql)

      dbConfig.query(sql, (err, rows, fields) => {
        if (!err) res.send(rows);
        else res.json(err);
      });
    } catch (e) {
      res.json(e);
    }
  };
  

// guide.login = async (req) => {
//     return new Promise((resolve, reject) => {
//         try {
//             const phone = req.body.phone;
//             var password = req.body.password;
//             console.log(phone, password);
//             const sql = `SELECT * FROM guide_register WHERE phone = "${phone}"`
//             dbConfig.query(sql, (err, user) => {
//                 console.log(user, "guide");
//                 if (err) {
//                     return reject({ status: 500, message: err });
//                 } else {
//                     if (user.length == 0) {
//                         return resolve({ status: 404, message: "Phone number doesn't exist" });
//                     } else {
//                         const hashedPassword = user[0].password
//                         if (bcrypt.compareSync(password, hashedPassword)) {
//                             const token = jwt.sign({ phone: user[0].phone }, process.env.SECRET_KEY);
//                             return resolve({ id: user[0].trainer_id, token: token, role: 'guide' });
//                         } else {
//                             return reject({ status: 404, message: "Password Incorrect" });
//                         }

//                     }
//                 }
//             })
//         } catch (e) {
//             return reject(e);
//         }
//     })
// }

// guide.getSingleGuide = async (req) => {
//     return new Promise((resolve, reject) => {
//         try {
//             var id = req.params.id;
//             const sql =`SELECT guide_register.guide_id as guide_id,guide_register.guideName as guideName,guide_register.language_knows as languageknows,guide_register.countryId as countryId,countries.country as 
//             countryName,guide_register.stateId as stateId,states.state as stateName,guide_register.districtId as districtId,districts.district as districtName,guide_register.cityId as cityId,city.city as cityName,guide_register.areaId as areaId,area.area_name as areaName,guide_register.address as address,
//             guide_register.pincode as pincode,guide_register.phone as phone FROM  guide_register LEFT JOIN countries ON guide_register.countryId=countries.id LEFT JOIN states ON guide_register.stateId=states.id LEFT JOIN districts ON guide_register.districtId=districts.id LEFT JOIN city ON guide_register.cityId=city.id  
//             LEFT JOIN area ON guide_register.areaId=area.area_id  WHERE guide_register.guide_id  = "${id}"`;
//             dbConfig.query(sql, (err, result) => {
//                 if (!err) {
//                     return resolve(result);
//                 }
//                 else {
//                     return reject(err);
//                 }
//             })
//         } catch (err) {
//             return reject(err);
//         }
//     });
// }
// guide.updateGuide = async (req) => {
//     return new Promise((resolve, reject) => {
//         try {
//             var id = req.params.id;
//             const language_knows=reg.body.language_knows
//             const country = req.body.country;
//             const state = req.body.state;
//             const district = req.body.district;
//             const city = req.body.city;
//             const area = req.body.area;
//             const address = req.body.address;
//             const phone = req.body.phone;
//             const aboutme=req.body.aboutme
//             const pincode = req.body.pincode;
//             const name = req.body.name;
//             const sql = `UPDATE guide_register SET name="${name}",language_knows= "${language_knows}",aboutme="${aboutme}",
//         phone="${phone}",countryId="${country}",stateId="${state}",districtId="${district}",cityId="${city}",areaId="${area}",address="${address}",pincode="${pincode}" WHERE guide_id  = "${id}"`;
//             dbConfig.query(sql, (err, result) => {
//                 if (!err) {
//                     return resolve(result);
//                 }
//                 else {
//                     return reject(err);
//                 }
//             })
//         } catch (err) {
//             return reject(err);
//         }
//     })
// }
// guide.getallGuide = async (req) => {
//     return new Promise((resolve, reject) => {
//         try {
//             const sql = `SELECT guide_id,guideName FROM guide_register`;
//             dbConfig.query(sql, (err, result) => {
//                 if (!err) {
//                     return resolve(result);
//                 }
//                 else {
//                     return reject(err);
//                 }
//             })
//         } catch (err) {
//             return reject(err);
//         }
//     })
// }
// guide.deleteGuide = async (req) => {
//     return new Promise((resolve, reject) => {
//         try {
//             var id = req.params.id;
//             const sql = `DELETE FROM guide_register WHERE guide_id = "${id}"`;
//             dbConfig.query(sql, (err, result) => {
//                 if (!err) {
//                     return resolve(result);
//                 }
//                 else {
//                     return reject(reject);
//                 }
//             })
//         } catch (err) {
//             return reject(err);
//         }
//     })
// }
// module.exports = guide;