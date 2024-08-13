const express = require("express");
const router = express.Router();
const dbConfig = require("../database/config");
const templeCreate = require("../controller/TempleCreate");

router.post("/CreateTemple", async (req, res, next) => {
  try {
    let result = await templeCreate.TempleNewCreate(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/getall", async (req, res, next) => {
  try {
    let result = await templeCreate.getAllTemple(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/templebyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bookings = await templeCreate.getTempleById(id);
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
router.get("/templefilter", async (req, res) => {
  try {
    const templeData = await templeCreate.filterTempleData(req);
    res.json({ success: true, data: templeData });
  } catch (error) {
    console.error("Error fetching temple data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
