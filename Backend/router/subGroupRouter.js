const express = require("express");

const router = express.Router();

const subGroupController = require("../controller/subGroup.controller");

router.post("/CreatesubGroup", async (req, res, next) => {
  try {
    let result = await subGroupController.createSubGroup(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/getAllsubGroup", async (req, res, next) => {
  try {
    let result = await subGroupController.getAllSubGroups(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.put("/editSubGroup/:id", async (req, res, next) => {
  try {
    let result = await subGroupController.updateSubGroup(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.delete("/deleteSubGroup/:id", async (req, res, next) => {
  try {
    let result = await subGroupController.deleteSubGroup(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
