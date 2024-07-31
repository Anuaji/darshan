const express = require("express");
const router = express.Router();

//Importing controller
const kulatheaivam = require("../controller/kulatheaivam.controller");

//Router createkulatheaivam
router.get("/getAll", kulatheaivam.getAllkulatheaivam);
router.get("/getAllByGroup/:Groupname", kulatheaivam.getAllByGroup);
router.get(
  "/getmatrimonialByGroup",
  kulatheaivam.getmatrimonialByGroup
);
router.get(
  "/getnotificationByGroup/:Groupname",
  kulatheaivam.getnotificationByGroup
);

router.post("/family_member_login", kulatheaivam.family_member_login);
router.post("/create", kulatheaivam.createkulatheaivam);
router.put("/update/:id", kulatheaivam.updatekulatheaivam);
router.delete("/delete/:id", kulatheaivam.deletekulatheaivam);

module.exports = router;
