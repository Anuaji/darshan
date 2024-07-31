const dbConfig = require("../database/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerCommunityAdmin = async (req, res) => {
  

  try {
    const name = req.body?.name;
    const phone_number = req.body?.phone_number;
    const email_id = req.body?.email_id;
    const country = req.body?.country;
    const state = req.body?.state;
    const district = req.body?.district;
    const city = req.body?.city;
    const area = req.body?.area;
    const address = req.body?.address;
    const pincode = req.body?.pincode;
    const kuladevam = req.body?.kuladevam;
    const kuladevam_country = req.body?.kuladevam_country;
    const kuladevam_state = req.body?.kuladevam_state;
    const kuladevam_district = req.body?.kuladevam_district;
    const kuladevam_city = req.body?.kuladevam_city;
    const kuladevam_address = req.body?.kuladevam_address;
    const groupName = req.body?.groupName;
    const password = req.body?.password;
    const hash = bcrypt.hashSync(password, 10);

    console.log("bnnnnnnn", password);
    console.log("req.body :>> ", req.body);
    const query = `INSERT INTO communityadmin(name,phone_number,email_id,country,state,district,city,area,address,pincode,password,kuladevam,kuladevam_country,kuladevam_state,kuladevam_district,kuladevam_city,kuladevam_address,groupName)
   VALUES ("${name}",
   "${phone_number}",
   "${email_id}",
   '${country}','${state}','${district}','${city}','${area}',"${address}",'${pincode}',
   "${hash}","${kuladevam}",'${kuladevam_country}','${kuladevam_state}','${kuladevam_district}','${kuladevam_city}',"${kuladevam_address}","${groupName}");`;

    dbConfig.query(query, (err, rows) => {
      if (err?.code == "ER_DUP_ENTRY") {
        if (err.sqlMessage?.includes("phone_number")) {
          return res.status(409).json({
            status: "Failed",
            message: "Phone number is already taken!",
          });
        }
        if (err.sqlMessage?.includes("groupName")) {
          return res.status(409).json({
            status: "Failed",
            message: "Group Name is already taken!",
          });
        }
      }

      if (err) {
        return res.status(400).json({ err, status: "Failed" });
      }
      res.json({
        status: "Success",
        result: rows,
        message: "Register is successful please wait for admin confirmation",
      });
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", error });
  }
};

exports.getCommunityAdminById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({ status: "Failed", message: "Invalid ID format" });
    }

    const query = `SELECT * FROM communityadmin WHERE id = ?`;

    dbConfig.query(query, [id], (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", result: err });
      }

      if (rows.length === 0) {
        return res.status(404).json({ status: "Failed", message: "Community admin not found" });
      }

      res.json({ status: "Success", result: rows[0] });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", result: error });
  }
};



exports.getDetailsByGroupName = (req, res) => {
  try {
    const groupName = req.params?.groupName;
    const query = `SELECT kuladevam,name,groupName FROM communityadmin WHERE groupName = "${groupName}";`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed" });
  }
};

exports.getCurrentUserFamilyName = async (req, res) => {
  try {
    // const token = req.cookies?.jwt;
    // const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(req);
    const groupName = req.params?.groupName;
    console.log(groupName, "kklk");
    const query = `SELECT familyName FROM communityadmin where Groupname="${groupName}"`;

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

exports.approveOrRejectCommunityAdmin = (req, res) => {
  try {
    const status = req.body?.status;
    const id = req.body?.id;
    const query = `UPDATE communityadmin SET status='${status}' WHERE id='${id}';`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed" });
  }
};

exports.getFamilyMembersList = (req, res) => {
  try {
    const query = `SELECT count(id) as familyMembers FROM familymember;`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.getAllMatrimonials = (req, res) => {
  try {
    const query = `SELECT * FROM matrimonial;`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.createMatrimonialUser = (req, res) => {
  try {
    const name = req.body?.name?.replace(/"/g, "'");
    const phone_number = req.body?.phone_number;
    const date_of_birth = req.body?.date_of_birth;
    const gender = req.body?.gender;
    const zodiac_sign = req.body?.zodiac_sign;
    const star = req.body?.star;
    const salary = req.body?.salary;
    const description = req.body?.description?.replace(/"/g, "'");
    const country = req.body?.country;
    const state = req.body?.state;
    const district = req.body?.district;
    const city = req.body?.city;
    const area = req.body?.area;
    const address = req.body?.address?.replace(/"/g, "'");
    const pincode = req.body?.pincode;
    const groupId = req.body?.groupId;
    const education_qualification = req.body?.education_qualification?.replace(
      /"/g,
      "'"
    );

    const query = `INSERT INTO matrimonial(name,phone_number,date_of_birth,gender,zodiac_sign,star,salary,description,education_qualification,country,state,district,city,area,address,pincode,groupId) values("${name}","${phone_number}","${date_of_birth}","${gender}","${zodiac_sign}","${star}","${salary}","${description}","${education_qualification}",'${country}','${state}','${district}','${city}','${area}',"${address}",'${pincode}','${groupId}');`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.createFamily = (req, res) => {
  try {
    const name = req.body?.name;
    const nick_name = req.body?.nick_name;
    const family_name = req.body?.family_name;
    const country = req.body?.country;
    const state = req.body?.state;
    const district = req.body?.district;
    const city = req.body?.city;
    const area = req.body?.area;
    const address = req.body?.address?.replace(/"/g, "'");
    const pincode = req.body?.pincode;
    const groupId = req.body?.groupId;

    const query = `INSERT INTO familyName(name,nick_name,family_name,country,state,district,city,area,address,pincode,groupId) values("${name}","${nick_name}","${family_name}",'${country}','${state}','${district}','${city}','${area}',"${address}",'${pincode}','${groupId}');`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.updateMatrimonialUser = (req, res) => {
  try {
    console.log("Body", req.params?.id);
    const userId = req.params?.id;
    const name = req.body?.name?.replace(/"/g, "'");
    const phone_number = req.body?.phone_number;
    const date_of_birth = req.body?.date_of_birth;
    const gender = req.body?.gender;
    console.log('gender', gender)

    const zodiac_sign = req.body?.zodiac_sign;
    const star = req.body?.star;
    const salary = req.body?.salary;
    const description = req.body?.description?.replace(/"/g, "'");
    const country = req.body?.country;
    const state = req.body?.state;
    const district = req.body?.district;
    const city = req.body?.city;
    const area = req.body?.area;
    const address = req.body?.address?.replace(/"/g, "'");
    const pincode = req.body?.pincode;
    const education_qualification = req.body?.education_qualification?.replace(
      /"/g,
      "'"
    );

    const query = `UPDATE matrimonial SET name = "${name}", phone_number = "${phone_number}", date_of_birth = "${date_of_birth}", gender = "${gender}", zodiac_sign = "${zodiac_sign}", star = "${star}", salary = "${salary}", description = "${description}", country = '${country}', state = '${state}', district = '${district}', city = '${city}', area = '${area}', address = "${address}", pincode = '${pincode}', education_qualification="${education_qualification}"  WHERE id = '${userId}';`;
console.log('step1', query)
    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.removeMatrimonialUserById = (req, res) => {
  try {
    const query = `DELETE FROM matrimonial where id = '${req.params?.id}';`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }
      console.log(res, "sss");
      res.send(rows);
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.getAllJobs = (req, res) => {
  try {
    const query = `SELECT * FROM jobs;`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.getAllGroupname = (req, res) => {
  try {
    const query = `SELECT groupName FROM communityadmin;`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};
exports.getCurrentUserFamilyName = async (req, res) => {
  try {
    // const token = req.cookies?.jwt;
    // const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(req);
    const groupName = req.params?.groupName;
    console.log(groupName, "kklk");
    const query = `SELECT family_name FROM kulatheaivam_details where Groupname="${groupName}"`;

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

exports.communityUserapprovedByCommunityAdmin = async req => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;

    try {
      const sql = `UPDATE communityuser SET status = '${status}' where id  = '${id}' `;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

exports.createJobs = (req, res) => {
  try {
    const position = req.body?.position?.replace(/"/g, "'");
    const qualification = req.body?.qualification?.replace(/"/g, "'");
    const gender = req.body?.gender;
    const description = req.body?.description?.replace(/"/g, "'");
    const country = req.body?.country;
    const state = req.body?.state;
    const district = req.body?.district;
    const city = req.body?.city;
    const address = req.body?.address?.replace(/"/g, "'");
    const groupId = req.body?.groupId;

    const query = `INSERT into jobs(position,qualification,gender,description,country,state,district,city,address,groupId) values("${position}","${qualification}","${gender}","${description}",'${country}','${state}','${district}','${city}',"${address}",'${groupId}');`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.updateJobs = (req, res) => {
  try {
    const jobId = req.params?.id;
    const position = req.body?.position?.replace(/"/g, "'");
    const qualification = req.body?.qualification?.replace(/"/g, "'");
    const gender = req.body?.gender;
    const description = req.body?.description?.replace(/"/g, "'");
    const country = req.body?.country;
    const state = req.body?.state;
    const district = req.body?.district;
    const city = req.body?.city;
    const address = req.body?.address?.replace(/"/g, "'");

    const query = `UPDATE jobs SET position="${position}", qualification="${qualification}", gender="${gender}", description="${description}", address="${address}",country='${country}', state='${state}', district='${district}', city='${city}' WHERE id='${jobId}';`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.removeJobById = (req, res) => {
  try {
    const query = `DELETE FROM jobs where id = '${req.params?.id}';`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.getAllNotification = (req, res) => {
  try {
    const query = `SELECT * FROM notification;`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.createNotification = (req, res) => {
  const title = req.body?.title;
  const description = req.body?.description;
  const notifyDate = req.body?.notifyDate;
  const groupId = req.body?.groupId;
  const Groupname = req.body?.Groupname;
  try {
    const query = `INSERT INTO notification(title, description, notifyDate, groupId, Groupname) values("${title}","${description}","${notifyDate}",'${groupId}','${Groupname}');`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.updateNotificationById = (req, res) => {
  try {
    const title = req.body?.title;
    const description = req.body?.description;
    const notifyDate = req.body?.notifyDate;
    const id = req.params?.id;

    const query = `UPDATE notification SET title="${title}", description="${description}", notifyDate="${notifyDate}" WHERE id='${id}';`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.deleteNotificationById = (req, res) => {
  try {
    const query = `DELETE FROM notification where id = '${req.params?.id}';`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

exports.updateStatus = async (req, res) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;
    var rejectReasonByAdmin = req.body.rejectReasonByAdmin;

    try {
      var sql;
      if (status == 2) {
        sql = `UPDATE communityadmin SET status = '${status}', rejectReasonByAdmin = '${rejectReasonByAdmin}' where id  = '${id}' `;
      } else {
        sql = `UPDATE communityadmin SET status = '${status}' where id  = '${id}' `;
      }

      dbConfig.query(sql, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(result);
        }
      });
    } catch (err) {
      res.send(err);
    }
  });
};

exports.CommunityuserGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM communityadmin ", (err, rows, field) => {
    if (!err) {
      // console.log(rows, "here");
      res.send(rows);
    } else console.log(err);
  });
};

exports.CommunityuserGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM communityadmin ", (err, rows, field) => {
    if (!err) {
      // console.log(rows, "here");
      res.send(rows);
    } else console.log(err);
  });
};

exports.CommunityGetOne = (req, res) => {
  dbConfig.query(
    `SELECT ca.name,
    ca.phone_number,
    ca.email_id,
    ca.address,
    ca.pincode,
    ca.kuladevam,
    ca.kuladevam_address,
    ca.kuladevam_country,
    ca.kuladevam_state,
    ca.kuladevam_district,
    ca.kuladevam_city,
    ca.groupName,
    countries.country,
    states.state,
    districts.district,
    city.city,
    area.area_name
FROM communityadmin as ca
    LEFT JOIN countries ON countries.id = ca.country
    LEFT JOIN states ON states.id = ca.state
    LEFT JOIN districts ON districts.id = ca.district
    LEFT JOIN city ON city.id = ca.city
    LEFT JOIN area ON area.area_id = ca.area
WHERE ca.id = ${req.params?.id}`,
    (err, rows, _fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

// ============================================================COMMUNITY USER=======================================

exports.registerCommunityUser = async (req, res) => {
  // return new Promise((resolve, reject) => {
  //   var id=req.params.id;
  //   var status = req.body.status;

  //   try{
  //     const sql=`UPDATE communityadmin SET isAdmin_Approved='${status}' where id ='${id}'`;

  //     dbConfig.query(sql,(err,result))=>{
  //       if(err){
  //         return reject(err);
  //       }
  //       else{
  //         return resolve(result);
  //       }
  //     }
  //   }
  //   catch(e){
  //     return reject(e);
  //   }
  // });

  try {
    const name = req.body?.name;
    const nickName = req.body.nickName?.replace(/"/g, "'");
    const designation = req.body.designation?.replace(/"/g, "'");
    const description = req.body.description?.replace(/"/g, "'");
    const sex = req.body.sex;
    const phone_number = req.body?.phone_number;
    const email_id = req.body?.email_id;
    const country = req.body?.country;
    const state = req.body?.state;
    const district = req.body?.district;
    const city = req.body?.city;
    const area = req.body?.area;
    const address = req.body?.address;
    const pincode = req.body?.pincode;
    const groupName = req.body?.groupName;
    const familyName = req.body?.familyName;
    const password = req.body?.password;
    const hash = bcrypt.hashSync(password, 10);

    console.log(phone_number, "phoneNumber");
    const query = `INSERT INTO communityuser(name,nickName,designation,description,sex,phone_number,password,email_id,country,state,district,city,area,address,pincode,groupName,familyName)
   VALUES ("${name}",
   "${nickName}",
   "${designation}",
   "${description}",
   "${sex}",
   "${phone_number}",
   "${hash}",
   "${email_id}",
   '${country}','${state}','${district}','${city}','${area}',"${address}",'${pincode}',
   "${groupName}","${familyName}");`;

    dbConfig.query(query, (err, rows) => {
      console.log("siva ---", err);
      if (err?.code == "ER_DUP_ENTRY") {
        console.log("hi");
        if (err.sqlMessage?.includes("phone_number")) {
          console.log("df");
          return res.status(409).json({
            status: "Failed",
            message: "Phone number is already taken!",
          });
        }

        if (err.sqlMessage?.includes("familyName")) {
          return res.status(409).json({
            status: "Failed",
            message: "Family Name is already taken!",
          });
        }
      }
      if (err) {
        return res.status(400).json({ err, status: "Failed" });
      }
      res.json({
        status: "Success",
        result: rows,
        message:
          "Your account is not yet activated. Please wait 24 hrs to approve your Admin portal for more information please contact +919791036735",
      });
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", error });
  }
};

//getfamilyname and groupname
exports.getCurrentUserFamilyNames = async (req, res) => {
  try {
    // const token = req.cookies?.jwt;
    // const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(req);
    const groupName = req.params?.groupName;
    console.log(groupName, "kklk");
    const query = `SELECT familyName FROM communityuser where Groupname="${groupName}"`;

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

exports.getCommunityuserbyone = async (req, res) => {
  try {
    const id = req.params.id;

    dbConfig.query(
      `SELECT * FROM communityuser where id="${id}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};
exports.getAllcommunityuser = (req, res) => {
  try {
    const query = `SELECT * FROM communityuser;`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};
exports.CommunityuserupdateStatus = async (req, res) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var status = req.body.status;
    var rejectReasonByAdmin = req.body.rejectReasonByAdmin;

    try {
      var sql;
      if (status == 2) {
        sql = `UPDATE communityuser SET status = '${status}', rejectReasonByAdmin = '${rejectReasonByAdmin}' where id  = '${id}' `;
      } else {
        sql = `UPDATE communityuser SET status = '${status}' where id  = '${id}' `;
      }

      dbConfig.query(sql, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(result);
        }
      });
    } catch (err) {
      res.send(err);
    }
  });
};
exports.updatecommunityuser = (req, res) => {
  try {
    const name = req.body?.name?.replace(/"/g, "'");
    const nick_name = req.body?.nick_name?.replace(/"/g, "'");
    const familyName = req.body?.familyName?.replace(/"/g, "'");
    const designation = req.body.designation;
    const sex = req.body.sex;
    const email_id = req.body?.email_id;
    const groupName = req.body?.groupName;
    const country = req.body.country;
    const state = req.body.state;
    const district = req.body.district;
    const city = req.body.city;
    const area = req.body.area;
    const pincode = req.body?.pincode;
    const address = req.body?.address?.replace(/"/g, "'");
    const description = req.body?.description?.replace(/"/g, "'");

    const sql = `UPDATE communityuser SET
     name = "${name}",
     nick_name = "${nick_name}",
     familyName = "${familyName}",
     designation = "${designation}",
     sex = "${sex}",
     email_id="${email_id}",
     groupName="${groupName}",
     country = '${country || 0}',
     state = '${state || 0}',
     district = '${district || 0}',
     city = '${city || 0}',
     area = '${area || 0}',
     pincode = "${pincode}",
     address = "${address}",
     description = "${description}"
     WHERE id ='${req.params?.id}'`;

    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.json(err);
    });
  } catch (e) {
    res.json(e);
  }
};
exports.getAllByGroupuser = async function (req, res) {
  try {
    const token = req.cookies?.jwt;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    dbConfig.query(
      `SELECT * FROM communityuser WHERE groupName="${decodedToken?.groupName}"`,
      (err, rows, fields) => {
        if (err) console.log(err);
        else res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};
exports.deletecommunityuser = (req, res) => {
  try {
    let id = req.params.id;
    const sql = `DELETE FROM communityuser WHERE id='${id}'`;
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

exports.getApprovedCommunity = (_req, res) => {
  dbConfig.query(
    "SELECT * FROM `communityadmin` WHERE `status` = 1",
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

exports.getApprovedCommunityUser = (_req, res) => {
  dbConfig.query(
    "SELECT * FROM `communityuser` WHERE `status` = 1",
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

//matrimonal count api
exports.getCountMatrimonials = (req, res) => {
  try {
    const query = `SELECT COUNT(name) FROM matrimonial;`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};

//jobs count api
exports.getCountJobs = (req, res) => {
  try {
    const query = `SELECT COUNT(position) FROM jobs;`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};
exports.getFamilyNameToCheck = (req, res) => {
  const familyName = req.params.familyName;
  try {
    const query = `SELECT familyName FROM communityuser where familyName ='${familyName}';`;

    dbConfig.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", error: err });
      }
      if (rows.length === 0) {
        return res
          .status(200)
          .json({
            status: "No Same family Name",
            error: err,
            message: "Family Name Available",
          });
      } else {
        res.json({ status: "Success", result: "Family Name is Taken" });
      }
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error });
  }
};
