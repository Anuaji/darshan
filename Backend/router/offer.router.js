const express = require("express");
const router = express.Router();

const offer = require("../controller/offer.controller");
const { vendor } = require("../controller/registerApproval.controller");

router.post("/create", offer.create);
router.put("/update/:id", offer.updateOffer);

router.get("/getall", async (req, res) => {
  try {
    let result = await offer.getOfferAll();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("error occured");
  }
});
router.get("/vendorOffer/:vendorId", async (req, res) => {
  try {
    let result = await offer.getOffer(req);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("error occured");
  }
});

router.get("/vendorOfferDetail/:Id", async (req, res) => {
  try {
    let result = await offer.getVendorOffer(req);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("error occured");
  }
});

router.delete("/deleteOffer/:id", async (req, res, next) => {
  try {
    let result = await offer.deleteOffer(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
