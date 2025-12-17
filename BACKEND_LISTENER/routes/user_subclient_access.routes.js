const userSubclientAccess = require('../controllers/administration/user_subclient_access.controller');
const express = require('express');
const router = express.Router();

router.post("/",userSubclientAccess.createMany);
router.get("/:userId",userSubclientAccess.findAllSubclientsForAUser);
router.get("/useremail/:userEmailId",userSubclientAccess.findAllSubclientsForAUserUsingEmailId);
router.get("/",userSubclientAccess.findAllSubclientsForMe);
router.delete("/:userId",userSubclientAccess.deleteAllSubclientsForAUser);
module.exports = router;
