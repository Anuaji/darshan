//import from npm
const express = require("express");
const router = express.Router();

//import form controller
const districtController = require("../controller/district.controller");

// router
router.get("/getAll", districtController.getAll);
router.post("/create", districtController.createDistrict);
router.get("/getdistrict/:id", districtController.districtList);
router.put("/update/:id", districtController.updateDistrict);
router.delete("/delete/:id", districtController.deleteDistrict);
router.get("/getOne/:id", districtController.getOneDistrict);

//export the district routers
module.exports = router;
