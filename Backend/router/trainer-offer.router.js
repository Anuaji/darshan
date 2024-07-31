const express = require("express");
const router = express.Router();

const offer = require("../controller/trainer-offer.controller");

router.post("/create", offer.create);

router.get("/getAllTrainerOffer", async (req, res) => {
  try {
    let result = await offer.gettraineerOffer(req);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("error occured");
  }
});

module.exports = router;
