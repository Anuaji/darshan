const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const search_controller = require("../controller/advancefilter.controller");

//Url for home page

// router.post("/getAllMainGod", search_controller.searchGetAllMainGod);
router.post("/getAllCity", search_controller.searchGetAllCity);



// Exports router
module.exports = router;