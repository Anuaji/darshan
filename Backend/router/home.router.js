const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const home_controller = require("../controller/home.controller");

//Url for home page
router.get("/GETOne/:id", home_controller.HomegetSpecialId);
router.get("/getAll/:noItems", home_controller.HomeGetAll);
router.get("/getAllTemples", home_controller.templesGetAll);
router.get("/getTempleOne/:id", home_controller.HomegetTempleId);
router.get("/getImage/:id", home_controller.TempleImageGetOne);
// router.post("/searchList", home_controller.searchLists);

// Exports router
module.exports = router;
