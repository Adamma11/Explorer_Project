const university = require('../controllers/masters/university.controller');
const express = require('express');
const router = express.Router();

router.post("/",university.create);
router.get("/",university.findAll);
router.get("/:_id",university.findOne);
router.get("/searchfor/:searchString",university.searchFor);
router.get("/search/:searchString",university.searchUniversity);
router.put("/:_id",university.update);
router.delete("/:_id",university.delete);
module.exports = router;