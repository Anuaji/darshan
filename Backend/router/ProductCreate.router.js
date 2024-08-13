const express = require("express");

const router = express.Router();

const ProductCreate = require("../controller/ProductCreate.controller");

router.post("/createNewProduct", async (req, res, next) => {
  try {
    let result = await ProductCreate.createProduct(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/getallproduct", async (req, res, next) => {
  try {
    let result = await ProductCreate.getallProduct(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
