const dbConfig = require("../database/config");

let productCreate = {};

productCreate.createProduct = async (req) => {
  console.log("req.body :>> ", req.body);
  return new Promise((resolve, reject) => {
    try {
      const {
        vendorId,
        productType,
        productTitle,
        description,
        price,
        offerPrice,
        quantity,
        productImage,
      } = req.body;

      const sql = `
          INSERT INTO createProduct (
            vendor_id,productType, productTitle, description, price, offerPrice, quantity,productImage
          ) VALUES (?, ?, ?, ?, ?, ?, ?,?)
        `;

      const values = [
        vendorId,
        productType,
        productTitle,
        description,
        price,
        offerPrice,
        quantity,
        productImage,
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

productCreate.getallProduct = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM createProduct`;

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

module.exports = productCreate;
