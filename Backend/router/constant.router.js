const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const constant_value_controller = require("../controller/constant.controller");

//Url for home page
router.get("/getAll", constant_value_controller.ConstantGetAll);
router.get("/getOne/:id", constant_value_controller.ConstantGetOne);
router.post("/create", constant_value_controller.ConstantCreate);
router.put("/update/:id", constant_value_controller.ConstantUpdate);
router.delete("/delete/:id", constant_value_controller.ConstantDelete);

//Router export 
module.exports = router;