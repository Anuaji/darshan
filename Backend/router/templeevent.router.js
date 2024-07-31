const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const templeevent_controller = require("../controller/templeevent.controller");

//Url for home page
router.get("/getAll", templeevent_controller.TempleeventGetAll);
router.get("/getOne/:id", templeevent_controller.TempleeventGetOne);
router.post("/create", templeevent_controller.TempleeventCreate);
router.put("/update/:id", templeevent_controller.TempleeventUpdate);
router.delete("/delete/:id", templeevent_controller.TempleeventDelete);

//Router export 
module.exports = router;