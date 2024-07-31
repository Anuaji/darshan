const {
  registerCommunityAdmin,
  getCommunityAdminById,
  getDetailsByGroupName,
  getCurrentUserFamilyName,
  approveOrRejectCommunityAdmin,
  getFamilyMembersList,
  createMatrimonialUser,
  updateMatrimonialUser,
  removeMatrimonialUserById,
  getAllJobs,
  getAllMatrimonials,
  createJobs,
  updateJobs,
  removeJobById,
  getAllNotification,
  createNotification,
  updateNotificationById,
  deleteNotificationById,
  registerCommunityUser,
  getAllGroupname,
  updateStatus,
  CommunityuserGetAll,
  getCommunityuserbyone,
  CommunityGetOne,
  getAllcommunityuser,
  CommunityuserupdateStatus,
  updatecommunityuser,
  getAllByGroupuser,
  deletecommunityuser,
  communityUserapprovedByCommunityAdmin,
  getCurrentUserFamilyNames,
  getApprovedCommunity,
  getApprovedCommunityUser,
  getCountMatrimonials,
  getCountJobs,
  getFamilyNameToCheck,
} = require("../controller/community.controller");

const {
  getCommunityUserList,
  getCommunityUserListById,
  getAllByFamilyName,
  addCommunityMember,
  updateCommunityMember,
  deleteCommunityUser,
  getAllRelatedFamilyMembers,
  updateStatusmember,
  getCurrentUserFamilysNames,
  getCommunityUserListByFamilyName,
  checking,
  checkingOne,
} = require("../controller/communityAbstract.controller");

const router = require("express").Router();

router.post("/registerCommunityAdmin", registerCommunityAdmin);
router.get("/getCommunityAdminId/:id", getCommunityAdminById);

router.get("/getKuladevamByGroupName", getDetailsByGroupName);
router.get("/approvedCommunityAdmin", getApprovedCommunity);
router.get("/getCurrentUserFamilyName/:groupName", getCurrentUserFamilyName);
router.get("/approveOrRejectCommunityAdmin", approveOrRejectCommunityAdmin);
router.get(
  "/CommunityUserapprovedByCommunityAdmin/:id",
  communityUserapprovedByCommunityAdmin
);
router.get("/getFamilyMemberList", getFamilyMembersList);
router.get("/getAllMatrimonials/sum", getCountMatrimonials);
router.get("/getAllJob/sum", getCountJobs);
// Matrimonial routes
router.get("/getAllMatrimonials", getAllMatrimonials);
router.post("/createMatrimonial", createMatrimonialUser);
router.put("/updateMatrimonial/:id", updateMatrimonialUser);
router.delete("/deleteMatrimonials/:id", removeMatrimonialUserById);

// jobs routes
router.get("/getAllJob", getAllJobs);
router.post("/createJob", createJobs);
router.put("/updateJob/:id", updateJobs);
router.delete("/deleteJob/:id", removeJobById);
//Groupname
router.get("/getAllGroupname", getAllGroupname);

// notification routes
router.get("/getAllNotification", getAllNotification);
router.post("/createNotification", createNotification);
router.put("/updateNotification/:id", updateNotificationById);
router.delete("/deleteNotification/:id", deleteNotificationById);

// Status update for approval

router.put("/updateStatus/:id", updateStatus);
router.get("/getCommunity", CommunityuserGetAll);
router.get("/getOne/:id", CommunityGetOne);
// =================================COMMUNITY USER=============================
router.post("/registerCommunityUser", registerCommunityUser);
router.get("/getCurrentUserFamilyNames/:groupName", getCurrentUserFamilyNames);
router.get("/getoneUser/:id", getCommunityuserbyone);
router.get("/getCommunityuser", getAllcommunityuser);
router.put("/updatecommunityuserStatus/:id", CommunityuserupdateStatus);
router.put("/update/:id", updatecommunityuser);
router.get("/getAllByGroupuser/:Groupname", getAllByGroupuser);
router.delete("/deletecommunityuser/:id", deletecommunityuser);
router.get("/checking", checkingOne);
router.get("/approvedCommunityUser", getApprovedCommunityUser);

////Miscellanous
router.put("/updatestatusmember/:id", updateStatusmember);
router.get(
  "/getCurrentUserFamilysNames/:groupName",
  getCurrentUserFamilysNames
);
router.get("/communityAbstract", getCommunityUserList);
router.get("/communityAbstract/:id", getCommunityUserListById);
router.get("/communityAbstract/:family_name", getCommunityUserListByFamilyName);
router.get("/communityAbstract/family/:familyName", getAllByFamilyName);
router.post("/communityAbstract/addmember", addCommunityMember);
router.put("/communityAbstract/update/:id", updateCommunityMember);
router.delete("/communityAbstract/del/:id", deleteCommunityUser);
router.get("/getRelatedMembers", getAllRelatedFamilyMembers);

router.get("/getFamilyNameToCheck/:familyName", getFamilyNameToCheck);

module.exports = router;
