const express = require("express");
const dbConfig = require("../database/config");
const router = express.Router();

const godList = require("../controller/godList.controller");
router.post("/create", async (req, res) => {
  try {
    let result = await godList.create(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getall", async (req, res) => {
  try {
    let result = await godList.getAll(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getsingleData/:id", async (req, res) => {
  try {
    let result = await godList.getSingleData(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let result = await godList.delete(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    let result = await godList.update(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
