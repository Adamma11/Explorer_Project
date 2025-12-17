const dashboard = require('../controllers/administration/dashboard.controller')
const express = require('express');
const router = express.Router();

router.get("/",dashboard.readAll)

module.exports = router;
