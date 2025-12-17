const emailCandidateData = require("../controllers/data_entry/emailCandidateData.controller");
const express = require("express");
const router = express.Router();



router.post("/emailCandidateDataOfACheck",emailCandidateData.emailCandidateDataOfACheck);

module.exports =  router;
