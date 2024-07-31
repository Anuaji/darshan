const express = require("express");
const router = express.Router();
const approval = require("../controller/registerApproval.controller");

router.get("/getIyerlist", async (req, res) => {
  try {
    let result = await approval.iyer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getvendorlist", async (req, res) => {
  try {
    let result = await approval.vendor(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getuserlist", async (req, res) => {
  try {
    let result = await approval.user(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getguidelist", async (req, res) => {
  try {
    let result = await approval.guide(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getcommunitylist", async (req, res) => {
  try {
    let result = await approval.community(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/gettrainerlist", async (req, res) => {
  try {
    let result = await approval.trainer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getastrologerlist", async (req, res) => {
  try {
    let result = await approval.astrologer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/singleIyer/:id", async (req, res) => {
  try {
    let result = await approval.singleIyer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/singleVendor/:id", async (req, res) => {
  try {
    let result = await approval.singleVendor(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/singleUser/:id", async (req, res) => {
  try {
    let result = await approval.singleUser(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/singleguide/:id", async (req, res) => {
  try {
    let result = await approval.singleGuide(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.get("/singletrainer/:id", async (req, res) => {
  try {
    let result = await approval.singleTrainer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/singleastrologer/:id", async (req, res) => {
  try {
    let result = await approval.singleAstrologer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateiyer/:id", async (req, res) => {
  try {
    let result = await approval.updateIyer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateVendor/:id", async (req, res) => {
  try {
    let result = await approval.updateVendor(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    let result = await approval.updateUser(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateguide/:id", async (req, res) => {
  try {
    let result = await approval.updateGuide(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateTrainer/:id", async (req, res) => {
  try {
    let result = await approval.updateTrainer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateAstrologer/:id", async (req, res) => {
  try {
    let result = await approval.updateAstrologer(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
