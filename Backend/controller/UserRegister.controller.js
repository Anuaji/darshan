//Import from database
const dbConfig = require("../database/config");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//getallBlogs
exports.getallUser = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM site_user ORDER BY userregister.id DESC`,
      (err, rows, fields) => {
        if (!err) {
          console.log(rows, "rows");
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

exports.getoneUser = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM site_user WHERE id = "${req.params.id}"`,
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

exports.createUser = async (req, res) => {
  // console.log("req body", req.body);
  const userName = req.body.UserName;
  const countryId = req.body.CountryId;
  const stateId = req.body.StateId;
  const districtId = req.body.DistrictId;
  const cityId = req.body.CityId;
  const areaId = req.body.AreaId;
  const pincode = req.body.Pincode;
  const emailId = req.body.EmailId || "";
  const phone = req.body.Phone;
  const password = req.body.Password;
  const role = "user";
  const password_code = "0";
  try {
    const hash = bcrypt.hashSync(password, 10);
    const sql = `INSERT INTO site_user(UserName,CountryId,StateId,DistrictId,CityId,AreaId,Pincode,EmailId,Phone,Password)
        VALUES(?,?,?,?,?,?,?,?,?,?)`;
    const values = [
      userName,
      countryId,
      stateId,
      districtId,
      cityId,
      areaId,
      pincode,
      emailId,
      phone,
      hash,
    ];
    dbConfig.query(sql, values, (err, rows, fields) => {
      console.log("Error", err);

      if (!err) {
        try {
          const sql1 = `INSERT INTO all_users(role,email_id,password,Password_code)
            VALUES("${role}","${emailId}","${password}","${password_code}")`;

          dbConfig.query(sql1, (err, rows, fields) => {
            console.log("Error", err);

            const alluser = {
              emailId: rows.EmailId,
              id: rows.id,
            };
          });
        } catch (e) {
          res.json({ status: "Failed", e });
        }

        const user = {
          username: rows.UserName,
          emailId: rows.EmailId,
          id: rows.id,
        };
        return res.json({
          status: "Success",
          result: user,
          message:
            "Registration is successful please wait for admin confirmation",
        });
      }

      if (err?.code == "ER_DUP_ENTRY") {
        if (err.sqlMessage?.includes("EmailId")) {
          return res.status(409).json({
            status: "Failed",
            message: "Email id is already taken!",
          });
        }
        if (err.sqlMessage?.includes("Phone")) {
          return res.status(409).json({
            status: "Failed",
            message: "Phone number is already taken!",
          });
        }
      }

      return res.json({ status: "Failed", error: err });
    });
  } catch (e) {
    res.json({ status: "Failed", e });
  }
};

exports.login = (req, res) => {
  try {
    console.log("req", req.body);
    dbConfig.query(
      `SELECT * FROM site_user WHERE Phone = "${req.body.phone}"`,
      (err, rows) => {
        if (rows?.length > 0) {
          const user = rows[0];
          console.log("user@@@", user);
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
                { userId: user?.id },
                process.env.JWT_SECRET_KEY,
                {
                  expiresIn: 60 * 60,
                }
              );

              // res.status(200).send({ id: rows[0].id, token: token, role: 'user' });
              return res
                .cookie("jwt", token, { maxAge: "3600000", httpOnly: true })
                .json({
                  token: token,
                  status: "Success",
                  message: "Login successful",
                  data: {
                    id: user?.id,
                    username: user?.UserName,
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
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "Something went wrong" });
  }
};

//updateUser
exports.updateUser = (req, res) => {
  try {
    const userName = req.body.UserName;
    const countryId = req.body.CountryId;
    const stateId = req.body.StateId;
    const districtId = req.body.DistrictId;
    const cityId = req.body.CityId;
    const areaId = req.body.AreaId;
    const pincode = req.body.Pincode;
    const emailId = req.body.EmailId;
    const phone = req.body.Phone;
    const password = req.body.Password;

    const sql = `UPDATE site_user SET userName= "${userName}",countryId = '${
      countryId || 0
    }',stateId = '${stateId || 0}',districtId = '${
      districtId || 0
    }',cityId = '${cityId || 0}',areaId = '${
      areaId || 0
    }',pincode = "${pincode}",emailId = "${emailId}",phone = "${phone}",password = "${password}" WHERE id = '${
      req.params?.id
    }';`;

    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.json(err);
    });
  } catch (e) {
    res.json(e);
  }
};

exports.getApproveUser = (_req, res) => {
  dbConfig.query(
    "SELECT * FROM `site_user` WHERE `isApproved` = 1",
    (err, rows, _field) => {
      if (!err) {
        // res.status(200).json({
        //   status: "Success",
        //   message: "Required Approved Temple is fetched ",
        //   results: rows,
        // });
        console.log("rows", rows);
        res.status(201).send(rows);
      } else {
        res.status(500).json({
          status: "Failed",
          message: "Something wrong happened ",
        });
      }
    }
  );
};
