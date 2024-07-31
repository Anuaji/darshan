const express = require("express");
const router = express.Router();

const InauspiciousController = require("../controller/inauspiciouse.controller");

router.get("/getAll", InauspiciousController.InauspiciouseGetAll);

module.exports = router;
