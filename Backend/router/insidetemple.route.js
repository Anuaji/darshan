const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const insideTempleController = require("../controller/insidetemple.controller");

//Url for home page
router.get("/getAll", insideTempleController.insideTempleGetAll);
router.get("/getOne/:id", insideTempleController.insideTempleGetOne);
router.post("/create", insideTempleController.insideTempleCreate);
router.put("/update/:id", insideTempleController.insideTempleUpdate);
router.delete("/delete/:id", insideTempleController.insideTempleDelete);

//Router export
module.exports = router;
