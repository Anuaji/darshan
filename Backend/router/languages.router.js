const express = require('express');
const router = express.Router();
const languages_controller = require("../controller/languages.controller");

router.get("/getAll",languages_controller.languageGetAll);


module.exports = router;