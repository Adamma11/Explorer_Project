const userRole = require('../controllers/administration/user_role.controller');
const express = require('express');
const router = express.Router();

//router.post("/",userRole.create);
router.post("/",userRole.createMany);
//router.get("/",userRole.findAll);
router.get("/role/:roleId",userRole.findAllForARole);
router.get("/user/:userId",userRole.findAllForAUser);
router.get("/alluserswithdetailsforrole/:role_id",userRole.findAllUsersWithDetailsForARole)
router.get("rolesforcurrentuser",userRole.findAllRolesForCurrentUser)
//router.get("/:userId/:roleId",userRole.findOne);
router.put("/:userId/:roleId",userRole.update);
//router.delete("/:userId/:roleId",userRole.delete);
router.delete("/role/:roleId",userRole.deleteAllUsersForARole);
router.delete("/user/:userId",userRole.deleteAllRolesForAUser);
router.get("/findallrolestodisplay/:userId",userRole.findAllRolesForAUserToDisplay);
module.exports = router;
