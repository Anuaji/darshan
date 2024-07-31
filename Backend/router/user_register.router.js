const express = require("express");
const router = express.Router();

const user = require("../controller/user_register.controller");

router.post("/create", user.userCreate);
router.get("/getAll", user.userGetAll);
router.post("/userLogin", user.login);
module.exports = router;
