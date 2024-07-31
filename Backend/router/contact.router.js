const express = require("express");
const router = express.Router();

// Import Routing Controller
const contactUsController = require("../controller/contact.controlloer");

// Router methods
router.post("/create", contactUsController.createContact);
router.get("/getAll", contactUsController.getAllContact);
router.delete("/delete/:id", contactUsController.deleteContactUs);

//export router
module.exports = router;
