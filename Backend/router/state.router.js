//import form npm
const express = require("express");
const router = express.Router();

//Import from controller
const stateController = require("../controller/state.controller");

// Router
router.get("/getState/:id", stateController.stateList);
router.get("/getAll", stateController.getAll);
router.post("/create", stateController.createState);
router.put("/update/:id", stateController.updateState);
router.delete("/delete/:id", stateController.deleteState);
router.get("/getOne/:id", stateController.getOneState);

//export router
module.exports = router;
