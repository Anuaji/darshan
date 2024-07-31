//Import from database
const dbConfig = require("../database/config");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//getAll kulatheaivam
exports.getAllkulatheaivam = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * fROM kulatheaivam_details;`,
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

//create kulatheaivam
exports.createkulatheaivam = (req, res) => {
  console.log("req.body :>> ", req.body);
  const name = req.body.name?.replace(/"/g, "'");
  const nick_name = req.body.nick_name?.replace(/"/g, "'");
  const family_name = req.body.family_name?.replace(/"/g, "'");
  const designation = req.body.designation?.replace(/"/g, "'");
  const sex = req.body.sex;
  const Groupname = req.body.Groupname;
  const Country = req.body.Country;
  const State = req.body.State;
  const District = req.body.District;
  const City = req.body.City;
  const Area = req.body.Area;
  const pin_code = req.body.pin_code?.replace(/"/g, "'");
  const Address = req.body.Address?.replace(/"/g, "'");
  const Description = req.body.Description?.replace(/"/g, "'");
  const family_list = JSON.stringify(req.body.family_list);
  const hashedPassword = bcrypt.hashSync(req.body?.password, 10);
  const phone_number = req.body?.phone_number;

  var sql = `INSERT INTO kulatheaivam_details(name,nick_name,family_name,designation,sex,Groupname,Country,State,District,City,Area,pin_code,Address,Description,family_list,phone_number,password) VALUES("${name}","${nick_name}","${family_name}","${designation}","${sex}","${Groupname}","${Country}","${State}","${District}","${City}","${Area}","${pin_code}","${Address}","${Description}",'${family_list}',"${phone_number}","${hashedPassword}")`;

  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) {
        const user = {
          username: rows.UserName,
          emailId: rows.EmailId,
          id: rows.id,
        };

        if (err?.code == "ER_DUP_ENTRY") {
          if (err.sqlMessage?.includes("phone_number")) {
            return res.status(409).json({
              status: "Failed",
              message: "Phone number is already taken!",
            });
          }
        }

        return res.json({
          status: "Success",
          result: user,
          message: "Register is successful",
        });
      }
    });
  } catch (e) {
    res.json({ status: "Failed", e });
  }
};

//delete kulatheaivam
exports.deletekulatheaivam = (req, res) => {
  try {
    let id = req.params.id;
    const sql = `DELETE FROM kulatheaivam_details WHERE id='${id}'`;
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

//updatekulatheaivam
exports.updatekulatheaivam = (req, res) => {
  try {
    const name = req.body?.name?.replace(/"/g, "'");
    const nick_name = req.body?.nick_name?.replace(/"/g, "'");
    const family_name = req.body?.family_name?.replace(/"/g, "'");
    const designation = req.body.designation;
    const sex = req.body.sex;
    const Groupname = req.body.Groupname;
    const Country = req.body.Country;
    const State = req.body.State;
    const District = req.body.District;
    const City = req.body.City;
    const Area = req.body.Area;
    const pin_code = req.body?.pin_code;
    const Address = req.body?.Address?.replace(/"/g, "'");
    const Description = req.body?.Description?.replace(/"/g, "'");
    const family_list = JSON.stringify(req.body.family_list);

    const sql = `UPDATE kulatheaivam_details SET 
     name = "${name}",
     nick_name = "${nick_name}",
     family_name = "${family_name}",
     designation = "${designation}",
     sex = "${sex}",
     Groupname="${Groupname}",
     Country = '${Country || 0}',
     State = '${State || 0}',
     District = '${District || 0}',
     City = '${City || 0}',
     Area = '${Area || 0}',
     pin_code = "${pin_code}",
     Address = "${Address}",
     Description = "${Description}",
     family_list = '${family_list}'
     WHERE id ='${req.params?.id}';`;

    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.json(err);
    });
  } catch (e) {
    res.json(e);
  }
};

exports.getAllByGroup = async function (req, res) {
  try {
    const token = req.cookies?.jwt;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    dbConfig.query(
      `SELECT * FROM kulatheaivam_details WHERE Groupname="${decodedToken?.groupName}"`,
      (err, rows, fields) => {
        if (err) console.log(err);
        else res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};
// exports.getmatrimonialByGroup = async function (req, res) {
//   try {
//     // const Groupname = req.params.Groupname;

//     const token = req.cookies?.jwt;
//     // jwt.verify(, function (err, decoded) {
//     //   console.log("Secret key", decoded); // bar
//     // });

//     const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

//     dbConfig.query(
//       `SELECT * FROM matrimonial WHERE Groupname="${decodedToken?.groupName}"`,
//       (err, rows, fields) => {
//         if (err) console.log(err);
//         else res.send(rows);
//       }
//     );
//   } catch (e) {
//     throw e;
//   }
// };
// old code getby group name


exports.getmatrimonialByGroup = (req, res) => {
  try {
    dbConfig.query(
      `SELECT * fROM matrimonial;`,
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
exports.getnotificationByGroup = async function (req, res) {
  try {
    // const Groupname = req.params.Groupname;

    const token = req.cookies?.jwt;
    console.log('token', token)
    // jwt.verify(, function (err, decoded) {
    //   console.log("Secret key", decoded); // bar
    // });

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
console.log('decodedToken', decodedToken)
    dbConfig.query(
      `SELECT * FROM notification WHERE Groupname="${decodedToken?.groupName}"`,
      (err, rows, fields) => {
        if (err) console.log(err);
        else res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};

exports.family_member_login = async (req, res) => {
  try {
    dbConfig.query(
      `SELECT * FROM kulatheaivam_details WHERE phone_number = "${req.body.phone_number}"`,
      (err, rows) => {
        if (rows?.length > 0) {
          const user = rows[0];

          if (!err) {
            const password = bcrypt.compareSync(
              req.body.password,
              user.password
            );

            // if (user?.isApproved != 1) {
            //   return res
            //     .status(403)
            //     .json({ status: "Failed", message: "Admin need's to approve" });
            // }

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
                .json({ status: "Success", message: "Login successful" });
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
