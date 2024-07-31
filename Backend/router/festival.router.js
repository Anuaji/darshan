const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const festival_value_controller = require("../controller/festival.controller");

//Url for home page
router.get("/getAll", festival_value_controller.festivalGetAll);
router.get("/getOne/:id", festival_value_controller.festivalGetOne);
router.post("/create", festival_value_controller.festivalCreate);
router.put("/update/:id", festival_value_controller.festivalUpdate);
router.delete("/delete/:id", festival_value_controller.festivalDelete);

//Router export
module.exports = router;
