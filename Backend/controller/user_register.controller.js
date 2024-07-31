const dbConfig = require("../database/config");

const bcrypt = require("bcryptjs");

exports.userGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM user_register ", (err, rows, field) => {
    if (!err) {
      // console.log(rows, "here");
      res.send(rows);
    } else console.log(err);
  });
};

exports.userCreate = (req, res) => {
  console.log("hiiii");
  var user_name = req.body.user_name;
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var district_id = req.body.district_id;
  var EmailId = req.body.EmailId;
  var city_id = req.body.city_id;
  var area_id = req.body.area_id;
  var pincode = req.body.pincode;
  var phone = req.body.phone;
  var password = req.body.password;
  const hash = bcrypt.hashSync(password, 10);
  console.log(hash);
  password = hash;

  var sql = `INSERT INTO user_register
      ( user_name, country_id, state_id, district_id, city_id, area_id, pincode, phone, password,EmailId) VALUES
        ("${user_name}", "${country_id}", "${state_id}", "${district_id}", "${city_id}","${area_id}", "${pincode}", "${phone}", "${password}","${EmailId}" )`;
  console.log(sql, "here");
  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("Record Inserted Succesfully");
    console.log(req.body);
    res.send(rows);
  });
};

exports.login = (req, res) => {
  console.log("req.body :>> ", req.body);
  dbConfig.query(
    `SELECT * FROM user_register WHERE phone = ${req.body.phone}`,
    (err, rows, fields) => {
      if (rows.length > 0) {
        // console.log(rows[0].password, "row password");
        // console.log(req.body.phone, "**********************************");
        if (!err) {
          if (bcrypt.compareSync(req.body.password, rows[0].password)) {
            res.send(rows);
            console.log("success");
          } else {
            console.log(err, "Wrong Password");
          }
        } else console.log(err);
      } else {
        console.log(err, "User Does not Exist");
      }
    }
  );
};
