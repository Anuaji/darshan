const express = require("express");

const router = express.Router();

const iyerbookingController = require("../controller/iyerbooking.controller");

router.post("/createNewBooking", async (req, res, next) => {
  try {
    let result = await iyerbookingController.bookIyer(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/bookings/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await iyerbookingController.getBookingsByUserId(userId);
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/getVendor/:vendorId", async (req, res) => {
  const { vendorId } = req.params;

  try {
    const bookings = await iyerbookingController.getBookingsByVendorId(
      vendorId
    );
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.delete("/deletebooking/:userId", async (req, res) => {
  try {
    let result = await iyerbookingController.deleteIyer(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/updateApproveBooking/:id", async (req, res) => {
  try {
    let result = await iyerbookingController.updateApproval(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getSingleOrder/:iyerBookingId", async (req, res) => {
  try {
    let result = await iyerbookingController.getSingleIyer(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/getallIyer", async (req, res) => {
  try {
    let result = await iyerbookingController.getallIyerBooking();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/getallIyerBookingsWithAdminApprove", async (req, res) => {
  try {
    let result =
      await iyerbookingController.getallIyerBookingWithAdminApprove();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/getallIyerBookingWithApprove", async (req, res) => {
  try {
    let result = await iyerbookingController.getallIyerBookingWithApprove();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getallIyerBookingWithReject", async (req, res) => {
  try {
    let result = await iyerbookingController.getallIyerBookingWithReject();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get(
  "/getSingleIyerBookingWithAdminApprove/:iyerBookingId",
  async (req, res) => {
    try {
      let result =
        await iyerbookingController.getSingleIyerBookingWithAdminApprove(req);
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.get(
  "/getsingleIyerBookingWithReject/:iyerBookingId",
  async (req, res) => {
    try {
      let result = await iyerbookingController.getsingleIyerBookingWithReject(
        req
      );
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.get(
  "/getsingleIyerBookingWithApprove/:iyerBookingId",
  async (req, res) => {
    try {
      let result = await iyerbookingController.getsingleIyerBookingWithApprove(
        req
      );
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.put("/updateIyerBooking/:iyerbookingId", async (req, res) => {
  try {
    let result = await iyerbookingController.updateIyerBooking(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/approvebyiyer/:iyerbookingId", async (req, res) => {
  try {
    let result = await iyerbookingController.approvedByAdmin(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/ApprovedByIyer/:iyerbookingId", async (req, res) => {
  try {
    let result = await iyerbookingController.approveByIyer(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getIyerCountUser/:id", async (req, res) => {
  try {
    let result = await iyerbookingController.ApprovedIyerCount(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get(
  "/getIyerbookingDataFromAdmin/:status?/:iyerstatus?",
  async (req, res) => {
    try {
      let result = await iyerbookingController.getIyerbookingDataFromAdmin(req);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);
router.put("/updateRejectedIyer/:iyerbookingId", async (req, res) => {
  try {
    let result = await iyerbookingController.updateRejectedIyer(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/updateAssignIyer/:iyerbookingId", async (req, res) => {
  try {
    let result = await iyerbookingController.updateAssignIyer(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get(
  "/getIyeridAcceptOrders/:iyer_id/:isIyer_Approved?",
  async (req, res) => {
    try {
      let result = await iyerbookingController.getIyeridAcceptOrders(req);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

router.put("/updateprice/:iyer_booking_id", async (req, res) => {
  try {
    let result = await iyerbookingController.updateprice(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
