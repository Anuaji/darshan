const express = require("express");
const router = express.Router();

//Importing controller
const guide_guidelist_controller = require("../controller/guide_guidelist.controller");

//Router create trainerList
router.get("/getAll", guide_guidelist_controller.getAllguide);
router.post("/create", guide_guidelist_controller.createguide);
// router.put("/update/:id", trainer_trainerlist_controller.updatetrainer);
// router.delete("/delete/:id", trainer_trainerlist_controller.deletetrainer);



module.exports = router;