const getcaseController = require('../controllers/uploads/getDynamicCases.controller.js');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get("/GetCase",getcaseController.get);
module.exports = router;
