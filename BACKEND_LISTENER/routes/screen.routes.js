const screen = require('../controllers/administration/screen.controller');
const express = require('express');
const router = express.Router();

router.post("/",screen.create);
router.put("/:_id",screen.update);
router.get("/",screen.readAll);
module.exports = router;