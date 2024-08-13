const express = require("express");
const router = express.Router();
// Validation
const {
  iyerRegisterValidation,
  iyerLoginValidation,
} = require("./../validation/iyer/iyer.validation");
const iyerController = require("../controller/iyer.Controller");
const auth = require("../middleware/auth");

//new
const iyercreateController = require("../controller/IyerProfile.controller");

router.post("/register", async (req, res, next) => {
  try {
    let result = await iyerController.register(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", iyerLoginValidation, async (req, res, next) => {
  try {
    let result = await iyerController.login(req);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/getOneIyer/:iyerId", async (req, res) => {
  try {
    let result = await iyerController.getOneIyer(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/deleteIyer/:iyerId", async (req, res) => {
  try {
    let result = await iyerController.deleteIyer(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/getAllIyer", iyerController.getAllIyer);

router.get("/getiyerdetail/:id", async (req, res) => {
  try {
    let result = await iyerController.getIyerDetail(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/getIyerListCity/:cityid", async (req, res) => {
  try {
    let result = await iyerController.getIyerListCity(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getiyerlist/:cityid/:function_id", async (req, res) => {
  try {
    let result = await iyerController.getIyerList(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
// approve api
router.get("/iyerApprove", (req, res) => {
  try {
    let result = iyerController.iyerApproveId(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

///new create

router.post("/create", async (req, res, next) => {
  try {
    let result = await iyercreateController.create(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});



router.get("/getAllIyerlist", async (req, res) => {
  try {
    const result = await iyercreateController.getAllIyer();
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.get("/getbyid/:id", async (req, res) => {
  const vendorId = req.params.id;
  try {
    const result = await iyercreateController.getById(vendorId);
    res.status(result.status).json(result.data || { message: result.message });
  } catch (error) {
    console.error("Server error:", error); // Log errors
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.put("/updateIyer/:id", async (req, res) => {
  try {
    let result = await iyercreateController.update(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
