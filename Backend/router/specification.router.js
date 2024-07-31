const express = require("express");
const router = express.Router();

const specification_controller = require("../controller/specification.controller");

router.post("/create", specification_controller.specCreate);

router.get("/getAll", specification_controller.specGetAll);

router.get("/getOne/:id", specification_controller.getOne);

router.put("/update/:id", specification_controller.specUpdate);

router.delete("/delete/:id", specification_controller.specDelete);

router.get("/getGod", specification_controller.get_specList);

router.get("/getCount", specification_controller.getCount);

module.exports = router;
