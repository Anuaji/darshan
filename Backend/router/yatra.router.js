const router = require("express").Router();
const {
  createYatraBooking,
  yatraGetAll,
  yatraBookingGetAllbyid
} = require("../controller/yatraController");

router.post("/createYatraBooking", createYatraBooking);
router.get("/getAllYatraBooking", yatraGetAll);
router.get("/getAllbyIdYatraBooking/:id", yatraBookingGetAllbyid);

module.exports = router;
