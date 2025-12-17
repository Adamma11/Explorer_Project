const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');
const moment = require('moment');
dotenv.config();

function generateToken(userId,tokenType) {
    let currentDate = new Date();
    let lastDate = new Date();
    let lastDatePlusInMoment = moment(lastDate).add(330,'minutes')
    let lastDatePlusAtMidnightInMoment = lastDatePlusInMoment.set('hour',23).set('minute',59)
    let currentDatePlusInMoment = moment(currentDate).add(330,'minutes')
    let diffInSeconds  = lastDatePlusAtMidnightInMoment.diff(currentDatePlusInMoment,"seconds")
	
    if(tokenType ==='ACCESS'){
        return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET,{expiresIn:(diffInSeconds+"s")});
    }
    if(tokenType ==='REFRESH'){
        return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET,{expiresIn:(diffInSeconds+"s")});
    }

	
    // expires after half and hour (1800 seconds = 30 minutes)
/*    if(tokenType ==='ACCESS'){
        return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
    }
    if(tokenType ==='REFRESH'){
        return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET);
    }*/
}
module.exports = generateToken;  
