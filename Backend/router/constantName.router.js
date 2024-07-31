const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const constantName_controller = require("../controller/constantName.controller");

//Url for home page
router.get("/getAll", constantName_controller.ConstantnameGetAll);
router.get("/getOne/:id", constantName_controller.ConstantnameGetOne);
router.post("/create", constantName_controller.ConstantnameCreate);
router.put("/update/:id", constantName_controller.ConstantnameUpdate);
router.delete("/delete/:id", constantName_controller.ConstantnameDelete);

//Router export 
module.exports = router;