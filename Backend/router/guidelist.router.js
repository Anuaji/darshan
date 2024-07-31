
const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const guidelist_controller = require("../controller/guidelist.controller");

// url for training class_list page in bookmyiyer
router.get("/getAll", guidelist_controller.getAllGuideList);
router.get("/getone/:id", guidelist_controller.getoneUser);
router.post("/create", guidelist_controller.createGuideList);
router.delete("/delete/:id", guidelist_controller.deleteGuideList);

//Router export
module.exports = router;





