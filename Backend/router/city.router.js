const express = require("express");
const router = express.Router();

// Importing controller
const cityController = require("../controller/city.controller");

// Router
router.get("/getAll", cityController.getAllCity);
router.post("/create", cityController.createCity);
router.put("/update/:id", cityController.updateCity);
router.delete("/delete/:id", cityController.deleteCity);
router.get("/getCity/:id", cityController.cityList);
router.get("/getOne/:id", cityController.getOneCity);

// Export Router
module.exports = router;
