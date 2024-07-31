const express = require("express");
const router = express.Router();
const tripBooking = require("../controller/YatraBooking.controller");


router.post("/bookTrip", async (req, res) => {
  try {
    const result = await tripBooking.bookTrip(req);
    res.status(result.status).send(result.message);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

router.get("/getTrips", async (req, res) => {
  try {
    const result = await tripBooking.getTrips();
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

router.get("/getTrip/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await tripBooking.getTripById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

router.get("/getTripsByUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await tripBooking.getTripsByUserId(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

module.exports = router;
