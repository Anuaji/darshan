const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const main_god_value_controller = require("../controller/main_god.controller");

//Url for home page
router.get("/getAll", main_god_value_controller.main_godGetAll);
router.get("/getOne/:id", main_god_value_controller.main_godGetOne);
router.post("/create", main_god_value_controller.main_godCreate);
router.put("/update/:id", main_god_value_controller.main_godUpdate);
router.delete("/delete/:id", main_god_value_controller.main_godDelete);
router.get("/getGod", main_god_value_controller.get_godNameList);
router.get("/getCount", main_god_value_controller.getCount);

//Router export
module.exports = router;
