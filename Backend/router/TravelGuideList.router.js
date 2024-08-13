const express = require("express");
const GuideList = require("../controller/TravelGuideList.controller");

const router = express.Router();

router.post("/createNewGuide", async (req, res, next) => {
  try {
    let result = await GuideList.create(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/getall", async (req, res) => {
  try {
    const guide = await GuideList.getAllGuide();
    res.json({ success: true, data: guide });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
