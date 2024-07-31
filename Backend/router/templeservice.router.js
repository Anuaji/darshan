const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const templeServiceController = require("../controller/templeservices.controller");

router.get("/getAlls", templeServiceController.getAllVendorAD);
router.post("/createsAd", templeServiceController.createVendorAD);
router.put("/updates/:id", templeServiceController.updateAd);
router.delete("/deletes/:id", templeServiceController.deleteVendorAD);
router.get(
  "/getAdBasedOnUserId/:id",
  templeServiceController.getAdBasedOnUserID
);
router.get("/servicevendor", templeServiceController.getVendor);
router.get("/servicevendor/:categoryid", templeServiceController.getOneVendor);
router.get(
  "/servicevendor/details/:id",
  templeServiceController.getSpecificVendor
);
router.get(
  "/serviceVendor/basedLocationTemple",
  templeServiceController.getbasedlocation
);

//Router export
module.exports = router;
