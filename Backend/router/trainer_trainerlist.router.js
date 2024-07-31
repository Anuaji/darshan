const express = require("express");
const router = express.Router();

//Importing controller
const trainer_trainerlist_controller = require("../controller/trainer_trainerlist.controller");

//Router create trainerList
router.get("/getAll", trainer_trainerlist_controller.getAlltrainer);
router.post("/create", trainer_trainerlist_controller.createtrainer);
// router.put("/update/:id", trainer_trainerlist_controller.updatetrainer);
// router.delete("/delete/:id", trainer_trainerlist_controller.deletetrainer);



module.exports = router;