const userPassword = require('../controllers/administration/user_password.controller');
const cdePassword = require('../controllers/administration/cde_password.controller');
const authenticateToken = require('../shared/authenticate_token');
const express = require('express');
const router = express.Router();

router.post("/",userPassword.validate);
router.post("/validateotp",userPassword.validateOtp)
router.post("/validateforchange",authenticateToken,userPassword.validateForChangePassword);
router.post("/cdepasswordvalidate",cdePassword.validate)
router.post("/forgotPassword", userPassword.forgotPassword)
router.post("/mobile/validatepassword",userPassword.validatePasswordForMobileApp);
router.post("/forgotPassword", userPassword.forgotPassword)

module.exports = router;
