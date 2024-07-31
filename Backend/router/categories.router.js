const express = require("express");

const router = express.Router();

const categories = require("../controller/categories.controller");

router.post("/create", categories.create);
router.get("/getTopVendorCategries", categories.getTopVendorCategories);
router.get(
  "/getAllCategoriesWithVendorId/:vendorId",
  async (req, res, next) => {
    try {
      let result = await categories.selectAllCategoriesWithId(
        req.params.vendorId
      );
      res.send(result);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);
router.delete("/deleteCategory/:categoryId", async (req, res, next) => {
  try {
    let result = await categories.deleteCategory(req.params.categoryId);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/update/:categoriesId", async (req, res) => {
  try {
    let result = await categories.updateCategory(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.post("/getVendorSearchCategories", async (req, res) => {
  try {
    let result = await categories.selectAllCategoriesWithFilter(req);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get(
  "/getSubcategoriesBasedonVendorid/:vendorId/:subCategoriesId",
  async (req, res) => {
    try {
      let result = await categories.getSubcategoriesBasedonVendorid(req);
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);
router.get(
  "/getTempleServiceDetails/:vendorpost/:categoryid",
  async (req, res) => {
    try {
      let result = await categories.getCategoriesDetails(req);
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);
router.get("/getSingleCategory/:categoryId", async (req, res) => {
  try {
    let result = await categories.getSingleCategories(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get(
  "/getsinglecategoryFilter/:categoryId/:stateId/:districtId/:cityId/:subcategoryListId",
  async (req, res) => {
    try {
      let result = await categories.getSingleCategoryWithSearchFilter(req);
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.get(
  "/getAllCategoriesWithSubcategoryListId/:subCategoryListId",
  async (req, res) => {
    try {
      let result =
        await categories.selectAllCategoriesWithSpecifiedSubcategoryListId(req);
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);
router.get("/getCountBusiness/:vendorId", async (req, res) => {
  try {
    let result = await categories.getCountSubcategories(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/getAllCategoriesData", async (req, res) => {
  try {
    let result = await categories.getAllCategoriesData(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
