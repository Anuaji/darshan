const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const event_controller = require("../controller/event.controller");

//Url for home page
router.get("/getAll", event_controller.templeGetAll);
router.get("/eventDetails",event_controller.EventGetAll);
router.get("/getOne/:id", event_controller.templeGetOne);
router.get("/detailOne/:id",event_controller.EventGetOne);
router.post("/create", event_controller.templeCreate);
router.put("/update/:id", event_controller.templeUpdate);
router.delete("/delete/:id", event_controller.templeDelete);
router.get("/typeGet/:id",event_controller.templeTypeOne);


//Router export
module.exports = router;
