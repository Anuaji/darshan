const express = require("express");
const router = express.Router();

const hoteldetails_controller = require("../controller/hoteldetails.controller");
const hoteldetails_subimages_controller = require("../controller/hoteldetails_subimages.controller");

router.post("/create", hoteldetails_controller.create);
router.get("/getAll", hoteldetails_controller.detailsGetAll);
router.delete("/delete/:id", hoteldetails_controller.details_delete);
router.get("/getOne/:id", hoteldetails_controller.detailsGetOne);

router.put("/update/:id", hoteldetails_controller.details_update);
router.get("/hotelGet/:id", hoteldetails_controller.hotelGet);

// sub image
// router.post("/subimages", hoteldetails_subimages_controller.subimagecreate);

module.exports = router;
