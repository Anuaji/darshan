
const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const trainerclasslist_controller = require("../controller/trainerclasslist.controller");

// url for training class_list page in bookmyiyer
router.get("/getAll", trainerclasslist_controller.getAllTrainerClassList);
router.get("/getone/:id", trainerclasslist_controller.getoneUser);
router.post("/create", trainerclasslist_controller.createTrainerClassList);
router.delete("/delete/:id", trainerclasslist_controller.deleteTrainerClassList);

//Router export
module.exports = router;





