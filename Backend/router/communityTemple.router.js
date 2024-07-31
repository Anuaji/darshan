const router = require("express").Router();
const {
  getCurrentTempleMeta,
  createCommunityTempleMeta,
  updateCommunityTempleMeta,
  deleteCommunityTempleMeta,

  getCurrentTemplefunction,
  getAllCommunityTempleFunction,
  createCommunityTempleFunction,
  updateCommunityTempleFunction,
  deleteCommunityTempleFunction,

  getAllCommunityTempleIncharge,
  getCurrentTempleincharge,
  createCommunityTempleIncharge,
  updateCommunityTempleIncharge,
  deleteCommunityTempleIncharge,
  getTempleMetaByGroupName,
} = require("../controller/communityTemple.controller");

// Temple Meta Data
router.get("/getCurrentTempleMeta", getCurrentTempleMeta);
router.get("/getTempleMetaByGroup/:groupName", getTempleMetaByGroupName);

router.post("/createCommunityTempleMeta", createCommunityTempleMeta);

router.put("/updateCommunityTempleMeta/:id", updateCommunityTempleMeta);

router.delete("/deleteCommunityTempleMeta/:id", deleteCommunityTempleMeta);

// Temmple Function
router.get("/getCurrentTempleFunctions", getCurrentTemplefunction);

router.get("/getAllCommunityTempleFunctions", getAllCommunityTempleFunction);

router.post("/createCommunityTempleFunction", createCommunityTempleFunction);

router.put("/updateCommunityTempleFunction/:id", updateCommunityTempleFunction);

router.delete(
  "/deleteCommunityTempleFunctions/:id",
  deleteCommunityTempleFunction
);

// Temple Incharge
router.get("/getCurrentTempleincharge", getCurrentTempleincharge);

router.get("/getAllCommunityTempleIncharge", getAllCommunityTempleIncharge);

router.post("/createCommunityTempleIncharge", createCommunityTempleIncharge);

router.put("/updateCommunityTempleIncharge/:id", updateCommunityTempleIncharge);

router.delete(
  "/deleteCommunityTempleIncharge/:id",
  deleteCommunityTempleIncharge
);

module.exports = router;
