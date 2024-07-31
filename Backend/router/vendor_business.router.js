const express = require("express");
const router = express.Router();

const vendor_business_controller = require("../controller/vendor_business.controller");

router.post("/create", vendor_business_controller.createVendorBusiness);
router.get("/getAll", vendor_business_controller.hotelGetAll);
router.post("/changeStatus", vendor_business_controller.changeStatus);

module.exports = router;
