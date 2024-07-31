const express = require("express");
const router = express.Router();

//Importing controller
const areaController = require("../controller/area.controller");

//Router Create AREA
router.get("/getAll", areaController.getAll);
router.post("/create", areaController.createArea);
router.get("/:id", areaController.getOne);
router.put("/update/:id", areaController.updateArea);
router.delete("/delete/:id", areaController.deleteArea);
router.get("/getArea/:id", areaController.getArea);

module.exports = router;
