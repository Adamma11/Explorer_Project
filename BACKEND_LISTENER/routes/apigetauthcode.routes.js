const { validate } = require('../controllers/administration/user_password_no_otp.controller');
const express = require('express');
const router = express.Router();

router.post("/", validate)

module.exports = router
