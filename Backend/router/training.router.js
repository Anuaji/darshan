const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const training_value_controller = require("../controller/training.controller");

//Url for home page
router.get("/getAll", training_value_controller.trainingGetAll);
router.get("/getOne/:id", training_value_controller.trainingGetOne);
router.post("/create", training_value_controller.trainingCreate);
router.put("/update/:id", training_value_controller.trainingUpdate);
router.delete("/delete/:id", training_value_controller.trainingDelete);
router.get("/getApproveTrainer", training_value_controller.getApproveTrainer);

//Router export
module.exports = router;
