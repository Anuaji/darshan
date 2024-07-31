const express = require("express");

const router = express.Router();

const addNewTempleController = require("../controller/addNewTemple.controller");

router.post("/createAddnewTemple", async (req, res, next) => {
  try {
    let result = await addNewTempleController.createAddnewTemple(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.put("/editAddnewTemple/:id", async (req, res, next) => {
  try {
    let result = await addNewTempleController.updateAddnewTemple(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/getAllAddnewTemple", async (req, res, next) => {
  try {
    let result = await addNewTempleController.getAllAdddnewTemple(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/getbyidAddnewTemple/:id", async (req, res, next) => {
  try {
    let result = await addNewTempleController.getbyIdAdddnewTemple(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.delete("/deleteAddnewTemple/:id", async (req, res, next) => {
  try {
    let result = await addNewTempleController.deleteAdddnewTemple(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;

