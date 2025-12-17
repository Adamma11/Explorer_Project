const user = require('../controllers/administration/user.controller');
const express = require('express');
const router = express.Router();

router.post("/",user.create);
router.get("/",user.findAll);
router.get("/by-roles", user.findUsersByRoles);
router.get("/:_id",user.findOne);
router.get("/email/:userId",user.findOneWithEmailId);
router.put("/:_id",user.update);
router.delete("/:_id",user.delete);
//router.get("/by-roles", user.findUsersByRoles);
router.get("/getuserforpin/:pin",user.findUserWithPinCode);
router.get("/getusersforcomponent/:component_id",user.findUsersForTheComponent);
router.get("/getmyuserid/nouserid/nouserid",user.getMyUserId);
router.get("/myuserid/blank/new/usersreportingtome",user.usersReportingToMe)
module.exports = router;
