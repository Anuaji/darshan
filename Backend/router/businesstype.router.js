const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const businesstype_value_controller = require("../controller/businesstype.controller");

//Url for home page
router.get("/getAll", businesstype_value_controller.businesstypeGetAll);
router.get("/getOne/:id", businesstype_value_controller.businesstypeGetOne);
router.post("/create", businesstype_value_controller.businesstypeCreate);
router.put("/update/:id", businesstype_value_controller.businesstypeUpdate);
router.delete("/delete/:id", businesstype_value_controller.businesstypeDelete);
router.get("/getlist", businesstype_value_controller.get_typeNameList);
router.get("/getCount", businesstype_value_controller.getCount);

//Router export
module.exports = router;
