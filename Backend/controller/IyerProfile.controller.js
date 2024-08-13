const dbConfig = require("../database/config");

let iyer = {};

iyer.create = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const {
        AlternateNumber,
        aadharNumber,
        area,
        city,
        country,
        district,
        countryName,
        districtName,
        stateName,
        cityName,
        areaName,
        language,
        mobileNumber,
        poojaCounts,
        priestName,
        state,
        templeName,
        type,
        yearofExperience,
        iyer_image,
        yearofEstablish,
        serviceType,
        vendorId,
        address,
        pincode,
      } = req.body;
      console.log("req.body :>> ", req.body);
      const sql = `INSERT INTO iyerprofile (
        AlternateNumber,
        aadharNumber,
        area,
        city,
        country,
        district,
        countryName,
        districtName,
        stateName,
        cityName,
        areaName,
        language,
        mobileNumber,
        poojaCounts,
        priestName,
        state,
        templeName,
        type,
        yearofExperience,
        imageUrl,
        yearofEstablish,
        service,
        vendorId,
        address,
        pincode
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?)`;

      const values = [
        AlternateNumber,
        aadharNumber,
        area,
        city,
        country,
        district,
        countryName,
        districtName,
        stateName,
        cityName,
        areaName,
        JSON.stringify(language),
        mobileNumber,
        poojaCounts,
        priestName,
        state,
        templeName,
        type,
        yearofExperience,
        iyer_image,
        yearofEstablish,
        JSON.stringify(serviceType),
        vendorId,
        address,
        pincode,
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

iyer.getAllIyer = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM iyerprofile`;

    dbConfig.query(sql, (err, results) => {
      if (err) {
        return reject({ status: 500, message: "Error occurred" });
      } else {
        return resolve({ status: 200, data: results });
      }
    });
  });
};

iyer.getById = async (vendorId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM iyerprofile WHERE vendorId = ?`;

    dbConfig.query(sql, [vendorId], (err, results) => {
      if (err) {
        console.log("Database error (getById):", err);
        return reject({ status: 500, message: "Error occurred" });
      } else {
        if (results.length === 0) {
          return resolve({ status: 404, message: "No record found" });
        } else {
          return resolve({ status: 200, data: results[0] });
        }
      }
    });
  });
};

iyer.update = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const {
        AlternateNumber,
        aadharNumber,
        area,
        city,
        country,
        district,
        language,
        mobileNumber,
        poojaCounts,
        priestName,
        state,
        templeName,
        type,
        yearofExperience,
        iyer_image,
        yearofEstablish,
        serviceType,
        vendorId,
        address,
        pincode,
        PanCardNumber,
        GSTNumber,
        PanOrAdharUpload,
        AccountNumber,
        IFSCCode,
        BankName,
        branch,
        countryName,
        districtName,
        stateName,
        cityName,
        areaName,
        available_dates,
      } = req.body;
      console.log("req.body :>> ", req.body);

      if (!vendorId) {
        return reject({ status: 400, message: "Vendor ID is required" });
      }
      let sql = "UPDATE iyerprofile SET ";
      let values = [];
      let fieldUpdates = [];

      if (AlternateNumber !== undefined) {
        fieldUpdates.push("AlternateNumber = ?");
        values.push(AlternateNumber);
      }
      if (aadharNumber !== undefined) {
        fieldUpdates.push("aadharNumber = ?");
        values.push(aadharNumber);
      }
      if (area !== undefined) {
        fieldUpdates.push("area = ?");
        values.push(area);
      }
      if (city !== undefined) {
        fieldUpdates.push("city = ?");
        values.push(city);
      }
      if (country !== undefined) {
        fieldUpdates.push("country = ?");
        values.push(country);
      }
      if (district !== undefined) {
        fieldUpdates.push("district = ?");
        values.push(district);
      }
      if (language !== undefined) {
        fieldUpdates.push("language = ?");
        values.push(JSON.stringify(language));
      }
      if (mobileNumber !== undefined) {
        fieldUpdates.push("mobileNumber = ?");
        values.push(mobileNumber);
      }
      if (poojaCounts !== undefined) {
        fieldUpdates.push("poojaCounts = ?");
        values.push(poojaCounts);
      }
      if (priestName !== undefined) {
        fieldUpdates.push("priestName = ?");
        values.push(priestName);
      }
      if (state !== undefined) {
        fieldUpdates.push("state = ?");
        values.push(state);
      }
      if (templeName !== undefined) {
        fieldUpdates.push("templeName = ?");
        values.push(templeName);
      }
      if (type !== undefined) {
        fieldUpdates.push("type = ?");
        values.push(type);
      }
      if (yearofExperience !== undefined) {
        fieldUpdates.push("yearofExperience = ?");
        values.push(yearofExperience);
      }
      if (iyer_image !== undefined) {
        fieldUpdates.push("imageUrl = ?");
        values.push(iyer_image);
      }
      if (yearofEstablish !== undefined) {
        fieldUpdates.push("yearofEstablish = ?");
        values.push(yearofEstablish);
      }
      if (serviceType !== undefined) {
        fieldUpdates.push("service = ?");
        values.push(JSON.stringify(serviceType));
      }
      if (address !== undefined) {
        fieldUpdates.push("address = ?");
        values.push(address);
      }
      if (pincode !== undefined) {
        fieldUpdates.push("pincode = ?");
        values.push(pincode);
      }
      if (PanCardNumber !== undefined) {
        fieldUpdates.push("PanCardNumber = ?");
        values.push(PanCardNumber);
      }
      if (GSTNumber !== undefined) {
        fieldUpdates.push("GSTNumber = ?");
        values.push(GSTNumber);
      }
      if (PanOrAdharUpload !== undefined) {
        fieldUpdates.push("PanOrAdharUpload = ?");
        values.push(PanOrAdharUpload);
      }
      if (AccountNumber !== undefined) {
        fieldUpdates.push("AccountNumber = ?");
        values.push(AccountNumber);
      }
      if (IFSCCode !== undefined) {
        fieldUpdates.push("IFSCCode = ?");
        values.push(IFSCCode);
      }
      if (BankName !== undefined) {
        fieldUpdates.push("BankName = ?");
        values.push(BankName);
      }
      if (branch !== undefined) {
        fieldUpdates.push("branch = ?");
        values.push(branch);
      }
      if (countryName !== undefined) {
        fieldUpdates.push("countryName = ?");
        values.push(countryName);
      }
      if (districtName !== undefined) {
        fieldUpdates.push("districtName = ?");
        values.push(districtName);
      }
      if (stateName !== undefined) {
        fieldUpdates.push("stateName = ?");
        values.push(stateName);
      }
      if (cityName !== undefined) {
        fieldUpdates.push("cityName = ?");
        values.push(cityName);
      }
      if (areaName !== undefined) {
        fieldUpdates.push("areaName = ?");
        values.push(areaName);
      }
      if (available_dates !== undefined) {
        fieldUpdates.push("available_dates = ?");
        values.push(JSON.stringify(available_dates)); // Convert array to JSON string
      }

      sql += fieldUpdates.join(", ") + " WHERE vendorId = ?";
      values.push(vendorId);

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("Database error (update):", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          if (result.affectedRows === 0) {
            return resolve({ status: 404, message: "No record found" });
          } else {
            return resolve({ status: 200, message: "Updated successfully" });
          }
        }
      });
    } catch (e) {
      console.log("Internal server error (update):", e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

module.exports = iyer;
