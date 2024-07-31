const express = require("express");
const hotelBooking = require("../controller/HotelBooking.controller");
const router = express.Router();

router.post("/bookRoom", async (req, res) => {
  try {
    const result = await hotelBooking.bookHotel(req);
    res.status(result.status).send(result.message);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

router.get("/getroombooking", async (req, res) => {
  try {
    let result = await hotelBooking.getHotel();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get('/getroombooking/:id', async (req, res) => {
  try {
    const hotel = await hotelBooking.getHotelbyId(req);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});
router.get("/getRoomByUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await hotelBooking.getroomsByUserId(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

module.exports = router;
