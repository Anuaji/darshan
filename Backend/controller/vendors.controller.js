const { empty } = require("rxjs");
const dbConfig = require("../database/config");
const isEmpty = require("lodash.isempty");

//vendors get all
exports.vendors_GetAll = (req, res) => {
  try {
    dbConfig.query("SELECT * FROM vendors ", (err, rows, field) => {
      if (!err) {
        console.log(rows, "here");
        console.log(rows.vendor_name, "vendorNAme");
        res.send(rows);
      } else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};

//vendor update
exports.vendors_update2 = (req, res) => {
  console.log(req.body, "empty");
  var vendor_id = req.params.id;
  var vendor_name = req.body.vendor_name;
  var business_name = req.body.business_name;
  var phone_number = req.body.phone_number;
  var address = req.body.address;
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var district_id = req.body.district_id;
  var city_id = req.body.city_id;
  var area_id = req.body.area_id;
  var password = req.body.password;
  var pincode = req.body.pincode;

  var sql = `UPDATE vendors SET 
  vendor_name="${vendor_name}",
  business_name="${business_name}",
  phone_number="${phone_number}",
  address="${address}",
  country_id='${country_id}',
  state_id='${state_id}',
  district_id='${district_id}',
  city_id='${city_id}',
  area_id='${area_id}',
  password='${password}',
  pincode='${pincode}'
  WHERE vendor_id="${vendor_id}"`;
  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("Record Updated");
    res.send(rows);
  });
};

exports.vendor_update = (req, res) => {
  console.log("object212121 :>> ", req.body);
  const id = req.params.id;
  var vendor_name = req.body.vendor_name;
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var district_id = req.body.district_id;
  var city_id = req.body.city_id;
  var area_id = req.body.area_id;
  var phone_number = req.body.phone_number;
  var address = req.body.address;
  var business_name = req.body.business_name;

  var sql = `UPDATE vendors SET vendor_name="${vendor_name}",
  business_name="${business_name}",
  phone_number="${phone_number}",
  address="${address}",
  country_id="${country_id}",
  state_id="${state_id}",
  city_id="${city_id}",
  district_id="${district_id}",
  area_id="${area_id}"

  WHERE vendor_id ='${req.params.id}';`;
  dbConfig.query(sql, function (err, rows, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
};

exports.vendorGetOne = (req, res) => {
  dbConfig.query(
    `SELECT * FROM vendors WHERE vendor_id = ${req.params.id}`,
    (err, row, fields) => {
      if (!err) res.send(row);
      else console.log(err);
    }
  );
};

exports.vendorDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM vendors WHERE vendor_id= ${req.params.vendor_id}`,
    (err, row, fields) => {
      if (!err) res.send(row);
      else console.log(err);
    }
  );
};

// exports.vendorGetOneByNumber = (req, res) => {
// 	dbConfig.query(
// 		`SELECT * FROM vendors WHERE phone_number = ${req.params.phone_number}`,
// 		(err, row, fields) => {
// 			if (!err) res.send(row);
// 			else close.log(err);
// 		}
// 	);
// };

exports.changeStatus = async (req, res) => {
  var vendor_id = req.body.vendor_id;
  var status = req.body.status;
  // console.log("body",req.body);

  var sql = `UPDATE vendors SET is_active ="${status}" WHERE vendor_id ="${vendor_id}";`;

  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("status updated Succesfully");
    res.send(rows);
  });
};

exports.changePostStatus = async (req, res) => {
  var vendor_id = req.body.vendor_id;
  var postStatus = req.body.postStatus;
  // console.log("body",req.body);

  var sql = `UPDATE vendors SET post ="${postStatus}" WHERE vendor_id ="${vendor_id}";`;

  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("post status updated Succesfully");
    res.send(rows);
  });
};

//approve vendor

exports.vendorApproveId = (_req, res) => {
  dbConfig.query(
    "SELECT * FROM `vendors` WHERE `isApproved` = 1",
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
