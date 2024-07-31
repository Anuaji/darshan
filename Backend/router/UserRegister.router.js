const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dbConfig = require("../database/config");

//Importing controller
const RegisterController = require("../controller/UserRegister.controller");

//RoutercreateBlog
router.get("/getAll", RegisterController.getallUser);
router.get("/getOne/:id", RegisterController.getoneUser);
router.post("/create", RegisterController.createUser);
router.post("/login", RegisterController.login);
router.put("/update/:id", RegisterController.updateUser);
router.get("/getApproveUser", RegisterController.getApproveUser);
router.get("/getCurrentSiteUser", async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    dbConfig.query(
      `SELECT * FROM site_user WHERE id=${decodedToken?.userId}`,
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "Failed", message: "Something went wrong!" });
        }

        return res.json({ status: "Success", result });
      }
    );
  } catch (error) {
    res.status(401).json({ status: "Failed", message: "UnAuthorized Access" });
    console.log("Error", error);
  }
});

module.exports = router;
