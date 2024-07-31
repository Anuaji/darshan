const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const outsideTempleController = require("../controller/outsidetemple.controller");

//Url for home page
router.get("/getAll", outsideTempleController.outsideTempleGetAll);
router.get("/getOne/:id", outsideTempleController.outsideTempleGetOne);
router.post("/create", outsideTempleController.outsideTempleCreate);
router.put("/update/:id", outsideTempleController.outsideTempleUpdate);
router.delete("/delete/:id", outsideTempleController.outsideTempleDelete);

//Router export
module.exports = router;
