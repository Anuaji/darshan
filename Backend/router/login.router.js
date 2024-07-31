const dbConfig = require("../database/config");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/community", async (req, res) => {
  try {
    const phoneNumber = req.body?.phone;
    const password = req.body?.password;
    const status = 1;

    const query = `SELECT phone_number,password,id,groupName FROM communityadmin WHERE phone_number="${phoneNumber}" AND status="${status}" `;

    if (!phoneNumber || !password) {
      return res.status(405).json({
        status: "Failed",
        message: "Both phone number and password is required",
      });
    }

    dbConfig.query(query, (err, result) => {
      if (err || !result.length) {
        return res
          .status(500)
          .json({ status: "Failed", message: "Wrong credentials entered" });
      }
      const user = result[0];

      bcrypt.compare(password, user.password, function (err, comparedPass) {
        if (err) {
          return res
            .status(500)
            .json({ status: "Failed", message: "Password doesnt match" });
        }

        if (!comparedPass) {
          return res
            .status(401)
            .json({ status: "Failed", message: "Password don't match" });
        }

        const token = jwt.sign(
          { userId: user?.id, groupName: user?.groupName },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60,
          }
        );

        res.cookie("jwt", token, { maxAge: "3600000", httpOnly: true }).json({
          token: token,
          status: "Success",
          message: "Successfully login!",
          data: {
            id: user?.id,
            isAuthenticated: true,
            groupName: user?.groupName,
          },
        });
      });
    });
  } catch (error) {
    res.status(401).json({ status: "Failed", error });
  }
});
// ========================= Community USER ====================================

// router.post("/communityuser", async (req, res) => {
//   try {
//     const phoneNumber = req.body?.phone;
//     const password = req.body?.password;
//     const groupName = req.body?.groupName;
//     const query = `SELECT phone_number,password,id,groupName FROM communityuser WHERE phone_number="${phoneNumber}"`;

//     if (!phoneNumber || !password || !groupName) {
//       return res.status(405).json({
//         status: "Failed",
//         message:
//           "Both phone number and password is required and Group Name is required",
//       });
//     }

//     dbConfig.query(query, (err, result) => {
//       const user = result[0];
//       console.log(user, "cmmUser");
//       if (err || !result.length) {
//         return res
//           .status(500)
//           .json({ status: "Failed", message: "Something went wrong1" });
//       }

//       bcrypt.compare(password, user.password, function (err, comparedPass) {
//         if (err) {
//           return res
//             .status(500)
//             .json({ status: "Failed", message: "Something went wrong2" });
//         }

//         if (!comparedPass) {
//           return res
//             .status(401)
//             .json({ status: "Failed", message: "Password don't match" });
//         }
//         if (groupName !== user.groupName) {
//           return res
//             .status(402)
//             .json({ status: "Failed", message: "GroupName don't match" });
//         }
//         const token = jwt.sign(
//           { userId: user?.id, groupName: user?.groupName },
//           process.env.JWT_SECRET_KEY,
//           {
//             expiresIn: 60 * 60,
//           }
//         );

//         res.cookie("jwt", token, { maxAge: "3600000", httpOnly: true }).json({
//           token: token,
//           status: "Success",
//           message: "Successfully login!",
//           data: {
//             id: user?.id,
//             isAuthenticated: true,
//             groupName: user?.groupName,
//           },
//         });
//       });
//     });
//   } catch (error) {
//     res.status(401).json({ status: "Failed", error });
//   }
// });

// == commusernew==//
router.post("/communityuser", async (req, res) => {
  try {
    const phoneNumber = req.body?.phone;
    const password = req.body?.password;
    const groupName = req.body?.groupName;
    const familyName = req.body?.familyName;

    const query = `SELECT phone_number,password,id,groupName, familyName FROM communityuser WHERE phone_number="${phoneNumber}" AND groupName ="${groupName}"`;
    // ALTER TABLE `communityuser` ADD CONSTRAINT `UNIQUE` FOREIGN KEY (`phone`) REFERENCES `communityadmin`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

    dbConfig.query(query, (err, result) => {
      const user = result[0];
      console.log(
        "🚀 ~ file: login.router.js:195 ~ dbConfig.query ~ user",
        user
      );

      if (err || !result.length) {
        return res
          .status(500)
          .json({ status: "Failed", message: "Wrong credentials entered" });
      }

      bcrypt.compare(password, user.password, function (err, comparedPass) {
        if (err) {
          console.log("user triger");
          return res
            .status(500)
            .json({ status: "Failed", message: "Something went wrong2" });
        }

        if (!comparedPass) {
          return res
            .status(401)
            .json({ status: "Failed", message: "Password don't match" });
        }
        // if (groupName !== user.groupName) {
        //   return res
        //     .status(402)
        //     .json({ status: "Failed", message: "GroupName don't match" });
        // }
        const token = jwt.sign(
          { userId: user?.id, groupName: user?.groupName },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60,
          }
        );

        res.cookie("jwt", token, { maxAge: "3600000", httpOnly: true }).json({
          token: token,
          status: "Success",
          message: "Successfully login!",
          data: {
            id: user?.id,
            isAuthenticated: true,
            groupName: user?.groupName,
          },
        });
      });

      if (!phoneNumber || !password) {
        // || !groupName || !familyName) {

        return res.status(405).json({
          status: "Failed",
          message:
            "Both phone number and password  is required and Group Name is required",
        });
      }
    });
  } catch (error) {
    res.status(401).json({ status: "Failed", error });
  }
});

module.exports = router;

//Community members signin api
router.post("/communityFamilyMember", async (req, res) => {
  try {
    const phone_number = req.body?.phone_number;
    // console.log('phone_number', phone_number)
    const password = req.body?.password;
    // console.log('password', password)
    const groupName = req.body?.groupName;
    // console.log('groupName', groupName)
    const family_name = req.body?.family_name;
    // console.log('family_name', family_name)
    const query = `SELECT phone_number,password,id,groupName, isActive,family_name FROM communityabstract WHERE phone_number="${phone_number}"`;

    if (!phone_number || !password) {
      console.log("ssssssssssssss");
      return res.status(405).json({
        status: "Failed",
        message: "Both phone number and password  is required ",
      });
    }

    dbConfig.query(query, (err, result) => {
      if (err || !result.length) {
        return res.status(500).json({
          status: "Failed",
          message: "Please enter correct login credentials",
        });
      }

      const user = result[0];
      console.log(user[0], "user family");

      console.log(user.RowDataPacket, "result family");

      // var user;

      // for (let i = 0; i <result.password; i++) {
      //   var  user = result[i];
      // }

      // if (err || !result.length) {
      //   return res
      //     .status(500)
      //     .json({ status: "Failed", message: "Something went wrong1" });
      // }
      // if(result?.isActive !== "1"){
      if (result?.isActive === 0) {
        return res.status(500).json({
          status: "Failed",
          message: "You are not allowed to login! Please contact the admin",
        });
      }

      bcrypt.compare(password, user.password, function (err, comparedPass) {
        if (err) {
          console.log("triggered2");
          return res
            .status(500)
            .json({ status: "Failed", message: "Something went wrong3" });
        }

        if (!comparedPass) {
          return res
            .status(401)
            .json({ status: "Failed", message: "Password don't match" });
        }
        if (groupName !== user.groupName) {
          return res
            .status(402)
            .json({ status: "Failed", message: "GroupName don't match" });
        }
        const token = jwt.sign(
          { userId: user?.id, groupName: user?.groupName },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60,
          }
        );

        res.cookie("jwt", token, { maxAge: "3600000", httpOnly: true }).json({
          token: token,
          status: "Success",
          message: "Successfully login!",
          data: {
            id: user?.id,
            isAuthenticated: true,
            groupName: user?.groupName,
          },
        });
      });
    });
  } catch (error) {
    res.status(401).json({ status: "Failed", error });
  }
});

module.exports = router;

// login community header & community member

router.post("/head_member_login/:role", async (req, res) => {
  const role = req.params?.role;
  const phone_number = req.body?.phone_number;
  const entered_password = req.body?.password;

  try {
    const query = `SELECT phone_number,password,id ${
      role === "family_member" ? ",isActive" : ""
    } FROM ${
      role === "family_member" ? "communityabstract" : "communityuser"
    } WHERE phone_number = "${phone_number}"`;

    dbConfig.query(query, (err, rows) => {
      if (rows?.length > 0) {
        const user = rows[0];

        if (err) {
          return res
            .status(402)
            .json({ status: "Failed", message: "User does not exist" });
        }

        console.log("user", user, query);

        if (role === "family_member" && user?.isActive == 0) {
          return res
            .status(403)
            .json({ status: "Failed", message: "Login is forbidden" });
        }

        const password = bcrypt.compareSync(entered_password, user.password);

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
            .json({ status: "Success", message: "Login successful" });
        } else {
          return res
            .status(500)
            .json({ status: "Failed", message: "Something went wrong" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "Something went wrong" });
  }
});
