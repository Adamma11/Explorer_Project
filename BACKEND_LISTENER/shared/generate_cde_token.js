const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');

dotenv.config();

function generateCdeToken(caseId,tokenType) {
    // expires after half and hour (1800 seconds = 30 minutes)
    if(tokenType ==='ACCESS'){
        return jwt.sign(caseId, process.env.ACCESS_TOKEN_SECRET);
    }
    if(tokenType ==='REFRESH'){
        return jwt.sign(caseId, process.env.REFRESH_TOKEN_SECRET);
    }
}
module.exports = generateCdeToken;

