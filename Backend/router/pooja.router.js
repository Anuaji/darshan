const express = require("express");
const router = express.Router();

const PoojaController = require("../controller/Pooja.controller");

router.post("/createPooja", async (req, res, next) => {
  console.log("req :>> ", req.body);
  try {
    let result = await PoojaController.AddPooja(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/getAll", PoojaController.poojaGetAll);
router.get("/getbyid/:id", PoojaController.poojaGetById);

module.exports = router;
