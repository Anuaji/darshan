const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const pariharams_value_controller = require("../controller/pariharms.controller");

//Url for home page
router.get("/getAll", pariharams_value_controller.pariharamsGetAll);
router.get("/getOne/:id", pariharams_value_controller.pariharamsGetOne);
router.post("/create", pariharams_value_controller.pariharamsCreate);
router.put("/update/:id", pariharams_value_controller.pariharamsUpdate);
router.delete("/delete/:id", pariharams_value_controller.pariharamsDelete);

//Router export
module.exports = router;