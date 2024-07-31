const express = require("express");
const router = express.Router();

//Importing controller
const livestreamController = require("../controller/livestream.controller");

//RoutercreateBlog
router.get("/getAll", livestreamController.getAllLiveStream);
// router.get("/getOne/:id", livestreamController.getOneLiveStream);
router.post("/create", livestreamController.createLiveStream);
router.put("/update/:id", livestreamController.updateLiveStream);
router.delete("/delete/:id", livestreamController.deleteLiveStream);

module.exports = router;
