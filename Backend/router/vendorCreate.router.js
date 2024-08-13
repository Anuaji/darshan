const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const vendorCreateController = require("../controller/vendorCreate.Controller");

router.post("/vendorCreate", async (req, res, next) => {
  try {
    let result = await vendorCreateController.create(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/updateVendor/:id", async (req, res) => {
  try {
    let result = await vendorCreateController.update(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.get("/getAllVendorlist", async (req, res) => {
  try {
    const result = await vendorCreateController.getAll();
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(error.status || 500).json({ message: error.message });
  }
});
router.get("/getbyid/:id", async (req, res) => {
    const vendorId = req.params.id;
    try {
      const result = await vendorCreateController.getById(vendorId);
      res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
      console.error("Server error:", error); 
      res.status(error.status || 500).json({ message: error.message });
    }
  });

module.exports = router;
