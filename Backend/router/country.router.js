const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const country_value_controller = require("../controller/country.controller");

//Url for home page
router.get("/getAll", country_value_controller.countryGetAll);
router.get("/getOne/:id", country_value_controller.countryGetOne);
router.post("/create", country_value_controller.countryCreate);
router.put("/update/:id", country_value_controller.countryUpdate);
router.delete("/delete/:id", country_value_controller.countryDelete);

//Router export
module.exports = router;
