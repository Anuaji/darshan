const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const ticket_value_controller = require("../controller/ticket.controller");

//Url for home page
router.get("/getAll", ticket_value_controller.getticketList);
// router.get("/getOne/:id", ticket_value_controller.getticketList);
// router.post("/create", ticket_value_controller.getticketList);
// router.put("/update/:id", ticket_value_controller.getticketList);
// router.delete("/delete/:id", ticket_value_controller.getticketList);

//Router export
module.exports = router;
