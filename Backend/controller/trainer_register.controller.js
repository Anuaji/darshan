const dbConfig = require("../database/config");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

let trainer = {};

trainer.createRegister = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const name = req.body.name;
      console.log("req.body :>> ", req.body);
      // const businessName = req.body.businessName;
      const country = req.body.country;
      const state = req.body.state;
      const district = req.body.district;
      const city = req.body.city;
      const area = req.body.area;
      const address = req.body.address;
      const pincode = req.body.pincode;
      const email = req.body.email;
      const phone = req.body.phone_number;
      const aboutus= req.body.aboutus;
      const courselist = req.body.courselist;
      // const whatsapp = req.body.whatsapp_number;
      const hash = bcrypt.hashSync(req.body.password, 10);
      const password = hash;

      console.log(
        "hgbuyhgsd",
        name,
        country,
        state,
        district,
        city,
        area,
        address,
        pincode,
        aboutus,
        email,
        phone,
        password
      );
      const sqlQuery = `INSERT INTO trainer_register(trainerName,countryId,stateId,districtId,cityId,areaId,address,pincode,AboutUs,CourseList,email,phone,password)
            VALUES("${name}","${country}","${state}","${district}","${city}","${area}","${address}","${pincode}","${aboutus}","${courselist}","${email}","${phone}","${password}")`;

      // const sql2 = `SELECT * FROM trainer_register WHERE phone="${phone}"`;
      dbConfig.query(sqlQuery, (err, result) => {
        console.log("result :>> ", result);
        if (err) {
          console.log("err :>> ", err);
          return reject(err);
        }

        if (result) {
          if (err) {
            return reject(err);
          } else {
            let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY);
            return resolve({
              status: "Success",
              message:
                "Registration is successful please wait for admin confirmation",
              ID: result.insertId,
              token: token,
            });
          }
        } else {
          return reject({ status: 409, message: "Trainer already exists" });
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

trainer.login = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const phone = req.body.phone_number;
      const password = req.body.password;

      console.log("Received phone:", phone); // Log received phone number

      if (!phone || phone.trim() === '') {
        return reject({ status: 400, message: "Phone number is required" });
      }

      const sql = `SELECT * FROM trainer_register WHERE phone = ?`;
      console.log("SQL Query:", sql); // Log the SQL query to verify its correctness

      dbConfig.query(sql, [phone], (err, user) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          return reject({ status: 500, message: "Internal server error" });
        }

        console.log("User from database:", user); // Log the user variable to inspect its contents

        if (!user || user.length === 0) {
          return resolve({
            status: "Failed",
            message: "Phone number doesn't exist",
          });
        }

        const hashedPassword = user[0].password;
        if (bcrypt.compareSync(password, hashedPassword)) {
          const token = jwt.sign({ phone: user[0].phone }, process.env.SECRET_KEY);
          return resolve({
            id: user[0].trainer_id,
            token: token,
            role: "trainer",
            status: "Success",
            message: "Login Successfully",
          });
        } else {
          return reject({
            status: "Failed",
            message: "Password Incorrect",
          });
        }
      });
    } catch (e) {
      console.error("Caught exception in login:", e);
      return reject({ status: 500, message: "Internal server error" });
    }
  });
};



trainer.getSingleTrainer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const sql = `SELECT trainer_register.trainer_id as trainer_id,trainer_register.trainerName as trainerName,trainer_register.businessName as businessName,trainer_register.countryCode as countryCode ,trainer_register.countryId as countryId,countries.country as
            countryName,trainer_register.stateId as stateId,states.state as stateName,trainer_register.districtId as districtId,districts.district as districtName,trainer_register.cityId as cityId,city.city as cityName,trainer_register.areaId as areaId,area.area_name as areaName,trainer_register.address as address,
            trainer_register.pincode as pincode,trainer_register.email as email,trainer_register.phone as phone  FROM  trainer_register LEFT JOIN countries ON trainer_register.countryId=countries.id LEFT JOIN states ON trainer_register.stateId=states.id LEFT JOIN districts ON trainer_register.districtId=districts.id LEFT JOIN city ON trainer_register.cityId=city.id
            LEFT JOIN area ON trainer_register.areaId=area.area_id  WHERE trainer_register.trainer_id  = "${id}"`;
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

trainer.updateTrainer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const { name, businessName, country, state, district, city, area, address, pincode, email, phone, aboutus, courselist } = req.body;

      let setClauses = [];
      let params = [];

      // Check for both undefined and null
      if (name != null) {
        setClauses.push('trainerName = ?');
        params.push(name);
      }
      if (businessName != null) {
        setClauses.push('businessName = ?');
        params.push(businessName);
      }
      // if (email != null) {
      //   setClauses.push('email = ?');
      //   params.push(email);
      // }
      // if (aboutus != null) {
      //   setClauses.push('AboutUs = ?');
      //   params.push(aboutus);
      // }
      if (phone != null) {
        setClauses.push('phone = ?');
        params.push(phone);
      }
      if (country != null) {
        setClauses.push('countryId = ?');
        params.push(country);
      }
      if (state != null) {
        setClauses.push('stateId = ?');
        params.push(state);
      }
      if (district != null) {
        setClauses.push('districtId = ?');
        params.push(district);
      }
      if (city != null) {
        setClauses.push('cityId = ?');
        params.push(city);
      }
      if (area != null) {
        setClauses.push('areaId = ?');
        params.push(area);
      }
      if (address != null) {
        setClauses.push('address = ?');
        params.push(address);
      }
      if (pincode != null) {
        setClauses.push('pincode = ?');
        params.push(pincode);
      }
      if (courselist != null) {
        setClauses.push('CourseList = ?');
        params.push(courselist);
      }

      if (setClauses.length === 0) {
        return reject(new Error('No fields to update'));
      }

      const setClauseString = setClauses.join(', ');
      params.push(id);

      const sql = `UPDATE trainer_register SET ${setClauseString} WHERE trainer_id = ?`;
      console.log('Executing query:', sql, 'with params:', params);

      dbConfig.query(sql, params, (err, result) => {
        if (err) {
          console.error('Error updating trainer:', err);
          return reject(err);
        }
        console.log('Update result:', result);
        return resolve(result);
      });
    } catch (err) {
      console.error('Caught exception in updateTrainer:', err);
      return reject(err);
    }
  });
};



trainer.deleteTrainer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const sql = `DELETE FROM trainer_register WHERE trainer_id = "${id}"`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(reject);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
module.exports = trainer;
