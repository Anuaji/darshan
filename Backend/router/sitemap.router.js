const express = require("express");
const router = express.Router();

const siteMapController = require("../controller/sitemap.controller");

router.post("/create", siteMapController.createSiteMap);
router.get("/getAll", siteMapController.getAllSite);

module.exports = router;
