const dbConfig = require("../database/config");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

////Community user Creation
exports.addCommunityMember = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const designation = req.body.designation;
    const family_name = req.body.family_name;
    const country = req.body.country;
    const state = req.body.state;
    const district = req.body.district;
    const city = req.body.city;
    const area = req.body.area;
    const pin_code = req.body.pin_code;
    const address = req.body.address;
    const description = req.body.description;
    // const family_list = req.body.family_list;
    const groupName = req.body.groupName;
    const sex = req.body.sex;
    const phone_number = req.body.phone_number;
    const password = req.body.password;
    const isActive = req.body.isActive;
    const relationship = req.body.relationship;
    const hash = bcrypt.hashSync(password, 10);
    // const hashPassword = bcrypt.hashSync(password, 10);
    dbConfig.query(
      `INSERT INTO communityabstract(name,email,designation,family_name,country,state,district,city,area,pin_code,address,description,groupName,sex,phone_number,password,isActive,relationship) values("${name}","${email}","${designation}","${family_name}","${country}","${state}","${district}","${city}","${area}","${pin_code}","${address}","${description}","${groupName}","${sex}","${phone_number}","${hash}","${isActive}","${relationship}");`,
      (err, rows) => {
        if (err?.code == "ER_DUP_ENTRY") {
          if (err.sqlMessage?.includes("phone_number")) {
            return res.status(409).json({
              status: "Failed",
              message: "Phone number is already taken!",
            });
          }
        }

        if (err) {
          return res.status(400).json({
            err,
            status: "Failed",
            message: "Unexpected error occured Please try again",
          });
        }
        res.json({
          status: "Success",
          result: rows,
          message:
            "Your account is not yet activated. Please wait 24 hrs to approve your user portal for more information please contact +919791036735",
        });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", error });
  }
};
//       (err, rows) => {
//         if (err?.code == "ER_DUP_ENTRY") {
//           if (err.sqlMessage?.includes("phone_number")) {
//             return res.status(409).json({
//               status: "Failed",
//               message: "Phone number is already taken!",
//             });
//           }
//         }
//         if (err) {
//           res.status(500).json({ status: "Failed", message: err });
//         }
//         res.status(201).json({
//           status: "Success",
//           result: rows,
//           message: "Registration is Successfull wait for Admin confirmation",
//         });
//       }
//     );
//   } catch (err) {
//     res.status(500).json({ status: "Failed", message: err });
//   }
// };

//getfamilyname and groupname
exports.getCurrentUserFamilysNames = async (req, res) => {
  try {
    // const token = req.cookies?.jwt;
    // const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(req);
    const groupName = req.params?.groupName;
    console.log(groupName, "kklk");
    const query = `SELECT family_name FROM communityabstract where groupName="${groupName}"`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", result: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", result: error });
  }
};

//status approved
exports.updateStatusmember = async (req, res) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var isActive = req.body.isActive;

    try {
      const sql = `UPDATE communityabstract SET isActive = '${isActive}' where id  = '${id}' `;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return res.status(200).json("success");
          // return resolve(result);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

////Community User getall
exports.getCommunityUserList = async (req, res) => {
  try {
    dbConfig.query(`SELECT * FROM communityabstract`, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", message: err });
      }
      res.json({ status: "Success", result: rows });
    });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err });
  }
};

exports.getAllRelatedFamilyMembers = async (req, res) => {
  try {
    dbConfig.query(
      // `SELECT m.* FROM communityuser AS a INNER JOIN communityabstract AS m ON m.Groupname = a.groupName AND m.family_name=a.familyName`,
      `SELECT m.name,m.relationship,m.sex,m.family_name,m.groupName,a.name,a.groupName,a.familyName,a.sex FROM communityuser AS a INNER JOIN communityabstract AS m ON m.Groupname = a.groupName AND m.family_name=a.familyName`,
      // `SELECT m.* FROM kulatheaivam_details AS a INNER JOIN communityabstract AS m ON m.Groupname = a.Groupname AND m.family_name=a.family_name`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }
        res.json({ status: "Success", result: rows });
      }
    );
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err });
  }
};

////Community User GetbyId
exports.getCommunityUserListById = async (req, res) => {
  let id = req.params.id;
  try {
    dbConfig.query(
      `SELECT * FROM communityabstract WHERE id="${id}"`,
      (err, rows, id) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }
        if (rows.length === 0) {
          res.status(404).json({ status: "No data available" });
        } else {
          res.json({ status: "Success", result: rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err });
  }
};

//Community Get by using familyname
exports.getAllByFamilyName = async function (req, res) {
  let familyName = req.params.familyName;

  try {
    // const token = req.cookies?.jwt;
    // const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    dbConfig.query(
      `SELECT * FROM communityabstract WHERE family_name="${familyName}"`,
      (err, rows, fields) => {
        if (err) console.log(err);
        else {
          res.send(rows);
        }
      }
    );
  } catch (e) {
    res.status(404);
    throw e;
  }
};

//Community USER DELETE

exports.deleteCommunityUser = (req, res) => {
  try {
    let id = req.params.id;
    const sql = `DELETE FROM communityabstract WHERE id='${id}'`;
    dbConfig.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    throw e;
  }
};

////Community user Update
exports.updateCommunityMember = async (req, res) => {
  let id = req.params.id;
  try {
    const name = req.body.name;
    const email = req.body.email;
    const designation = req.body.designation;
    const family_name = req.body.family_name;
    const country = req.body.country;
    const state = req.body.state;
    const district = req.body.district;
    const city = req.body.city;
    const area = req.body.area;
    const pin_code = req.body.pin_code;
    const address = req.body.address;
    const description = req.body.description;
    // const family_list = req.body.family_list;
    const groupName = req.body.groupName;
    const sex = req.body.sex;
    const phone_number = req.body.phone_number;
    const password = req.body.password;
    const isActive = req.body.isActive;
    const relationship = req.body.relationship;
    // const hashPassword = bcrypt.hashSync(password, 10);

    const updatedData = `UPDATE communityabstract SET
     name = "${name}",
     email = "${email}",
     family_name = "${family_name}",
     designation = "${designation}",
     sex = "${sex}",
     groupName="${groupName}",
     country = '${country || 0}',
     state = '${state || 0}',
     district = '${district || 0}',
     city = '${city || 0}',
     area = '${area || 0}',
     pin_code = "${pin_code}",
     address = "${address}",
     description = "${description}",
     phone_number = '${phone_number}',
     relationship = '${relationship}',
     isActive = '${isActive}',
     password='${password}'
     WHERE id ='${id}'`;

    dbConfig.query(updatedData, (err, rows) => {
      if (err) {
        res.status(500).json({ status: "Faileddd", message: err });
      }
      res.status(201).json({ status: "Success", result: rows });
    });
  } catch (err) {
    res.status(500).json({ status: "FailedOut", message: err });
  }
};

///by familyname

exports.getCommunityUserListByFamilyName = async (req, res) => {
  let family_name = req.params.family_name;
  try {
    dbConfig.query(
      `SELECT * FROM communityabstract WHERE family_name="${family_name}"`,
      (err, rows, family_name) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }
        if (rows.length === 0) {
          res.status(404).json({ status: "No data available" });
        } else {
          res.json({ status: "Success", result: rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err });
  }
};

exports.checkingOne = async (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM communityuser `,

      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }
        if (rows.length === 0) {
          res.status(404).json({ status: "No data available" });
        } else {
          dbConfig.query(
            `SELECT m.name,m.sex,m.relationship,m.family_name FROM communityuser AS a INNER JOIN communityabstract AS m ON m.family_name=a.familyName `,

            (err, rows1) => {
              if (err) {
                return res.status(500).json({ status: "Failed", message: err });
              }
              if (rows.length === 0) {
                res.status(404).json({ status: "No data available" });
              } else {
                //////////// loop concept to compare 2 array of objects and return a element with two patched values /////////////////////

                let array = [];
                let finaldata = [];
                rows.forEach(ele => {
                  array = [];
                  for (var i = 0; i < rows1.length; i++) {
                    if (ele.familyName == rows1[i].family_name) {
                      array.push(rows1[i]);
                    }
                    if (i + 1 == rows1.length) {
                      console.log(array, "sssssssssss");
                      finaldata.push({
                        id: ele.id,
                        name: ele.name,
                        nickName: ele.nickName,
                        designation: ele.designation,
                        description: ele.description,
                        phone_number: ele.phone_number,
                        email_id: ele.email_id,
                        sex: ele.sex,
                        country: ele.country,
                        state: ele.state,
                        district: ele.district,
                        city: ele.city,
                        area: ele.area,
                        address: ele.address,
                        pincode: ele.pincode,
                        groupName: ele.groupName,
                        password: ele.password,
                        status: ele.status,
                        familyName: ele.familyName,
                        rejectReasonByAdmin: ele.rejectReasonByAdmin,
                        family_list: array,
                      });
                    }
                  }
                });

                res.json({
                  status: "Success",
                  result: finaldata,
                });
              }
            }
          );

          // /////////////////////////////////////////////////////////////////////////////
        }
      }
    );
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err });
  }
};
