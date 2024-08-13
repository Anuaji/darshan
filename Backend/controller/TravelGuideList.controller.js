const dbConfig = require("../database/config");

let GuideList = {};

GuideList.create = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const {
        vendorId,
        guideName,
        country,
        state,
        district,
        city,
        area,
        address,
        pincode,
        countryName,
        stateName,
        districtName,
        cityName,
        areaName,
        language,
        mobileNumber,
        AlternateNumber,
        aadharNumber,
        travelCount,
        yearofExperience,
        yearofEstablish,
        available_dates,
        guide_image,
      } = req.body;
      console.log("req.body :>> ", req.body);
      const sql = `INSERT INTO travelguidelist (
      vendorId,
      guideName,country, state,district, city, area,address,
        pincode,countryName,stateName,districtName,
        cityName,
        areaName,
        language,
        mobileNumber,
        AlternateNumber,
        aadharNumber,
        travelCount,
        yearofExperience,
        yearofEstablish,
       available_dates,
       guide_image
        
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`;

      const values = [
        vendorId,
        guideName,
        country,
        state,
        district,
        city,
        area,
        address,
        pincode,
        countryName,
        stateName,
        districtName,
        cityName,
        areaName,
        JSON.stringify(language),
        mobileNumber,
        AlternateNumber,
        aadharNumber,
        travelCount,
        yearofExperience,
        yearofEstablish,
        JSON.stringify(available_dates),
        guide_image,
      ];

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("Database error (create):", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({
            status: 200,
            message: "Created successfully",
          });
        }
      });
    } catch (e) {
      console.log("Internal server error (create):", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

GuideList.getAllGuide = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM travelguidelist`;

    dbConfig.query(sql, (err, results) => {
      if (err) {
        return reject({ status: 500, message: "Error occurred" });
      } else {
        return resolve({ status: 200, data: results });
      }
    });
  });
};

module.exports = GuideList;
