const express = require("express");
const router = express.Router();

//Importing controller
const forgotpassword = require("../controller/forgotpassword.controller");

router.post("/resetpassword", forgotpassword.resetpassword);
router.post("/checkcode", forgotpassword.checkcode);
router.put("/updatepassword/:id", forgotpassword.updatepassword);

module.exports = router;
