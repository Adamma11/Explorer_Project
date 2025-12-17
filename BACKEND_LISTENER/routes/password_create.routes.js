const userPassword = require('../controllers/administration/user_password.controller');
const cdePassword = require('../controllers/administration/cde_password.controller')
const authenticateToken = require('../shared/authenticate_token');
const express = require('express');
const router = express.Router();

router.post("/",userPassword.create);
router.post("/createforpasswordchange",authenticateToken,userPassword.createForChangePassword);
router.post("/cdepasswordcreate",cdePassword.create)
router.post("/cderjectionpassword",cdePassword.createRejectionPassword)
router.post("/validate",userPassword.validate);
module.exports = router;
