const express = require("express");

const router = express.Router();

const dilapatedController = require("../controller/DilapateTemple.controller");

router.post("/Createdilapatetemple", async (req, res, next) => {
  try {
    let result = await dilapatedController.createdilapidateTemple(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/getAlldilapidate", async (req, res, next) => {
  try {
    let result = await dilapatedController.getAlldilapidateTemple(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
