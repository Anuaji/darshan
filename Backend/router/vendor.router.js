const express = require("express");
const Admin = express.Router();
const dbConfig = require("../database/config");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const bcrypt = require("bcryptjs");

const admin = require("../model/vendors.model");

Admin.use(cors());

Admin.post("/register", (req, res) => {
  const {
    vendorType,
    vendor_name,
    business_name,
    phone_number,
    password,
    is_active = false,
    isApproved = 0,
    rejectReasonByAdmin = "",
  } = req.body;

  dbConfig.query(
    `SELECT * FROM vendors WHERE phone_number = ?`,
    [phone_number],
    (err, existingVendor) => {
      if (err) {
        console.error("Error checking existing vendor:", err);
        return res.json({
          status: "Failed",
          message: "Error checking existing vendor",
          error: err.message || err,
        });
      }

      if (existingVendor.length > 0) {
        return res.json({
          status: "Failed",
          message: "Phone number already exists. Registration not allowed.",
        });
      }

      const hash = bcrypt.hashSync(password, 10);
      const sql = `INSERT INTO vendors (vendor_name, business_name, phone_number, password, is_active,  isApproved, rejectReasonByAdmin, vendorType)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        vendor_name,
        business_name,
        phone_number,
        hash,
        is_active,
        isApproved,
        rejectReasonByAdmin,
        vendorType,
      ];

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error on vendor registration:", err);
          return res.json({
            status: "Failed",
            message: "Error on vendor signup",
            error: err.message || err,
          });
        }

        dbConfig.query(
          `SELECT * FROM vendors WHERE phone_number = ?`,
          [phone_number],
          (err, newVendor) => {
            if (err) {
              console.error("Error retrieving new vendor:", err);
              return res.json({
                status: "Failed",
                message: "Error retrieving new vendor",
                error: err.message || err,
              });
            }

            const user = {
              username: newVendor[0].vendor_name,
              id: newVendor[0].id,
            };

            return res.json({
              status: "Success",
              result: user,
              message:
                "Registration is successful. Please wait for admin confirmation.",
            });
          }
        );
      });
    }
  );
});

Admin.post("/login", (req, res) => {
  try {
    console.log("req", req.body);
    dbConfig.query(
      `SELECT * FROM vendors WHERE phone_number = "${req.body.phone_number}"`,
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

              return res
                .cookie("jwt", token, { maxAge: "3600000", httpOnly: true })
                .json({
                  status: "Success",
                  message: "Login successful",
                  data: {
                    user: user,
                    token: token,
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
});

const vendors_controller = require("../controller/vendors.controller");
Admin.get("/getAll", vendors_controller.vendors_GetAll);
Admin.put("/update/:id", vendors_controller.vendor_update);
Admin.get("/getOne/:id", vendors_controller.vendorGetOne);
Admin.delete("/delete/:vendor_id", vendors_controller.vendorDelete);
Admin.put("/changeStatus", vendors_controller.changeStatus);
Admin.put("/changePostStatus", vendors_controller.changePostStatus);
Admin.get("/vendorApprove", vendors_controller.vendorApproveId);

// router.get("getOneNumber/:phone_number", vendors_controller.vendorByNumber);

//Router export
module.exports = Admin;
