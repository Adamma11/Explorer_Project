express = require('express')
const jwt = require('jsonwebtoken');

function authenticateCdeToken(req, res, next) {
    console.log("In authenticate CDE Token New..............................")
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("Token got is ",token)
    if (token == null) return res.status(401).send({message:"Not Authorized"}) // if there isn't any token
    console.log("Token is not null.....................................",token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, caseId) => {
      console.log(".......lets see further..........")
      console.log(err)
      if (err) return res.status(403).send({message:"Forbidden"})
      req.caseId = caseId.caseId
      console.log("req case id is ",req.caseId)
//      console.log('authenticated token contains user  id ',req.user);
      next() // pass the execution off to whatever request the client intended
    })
}
module.exports = authenticateCdeToken;

