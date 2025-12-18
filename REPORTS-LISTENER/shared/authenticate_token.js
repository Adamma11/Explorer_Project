express = require('express')
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({message:"Not Authorized"}) // if there isn't any token
  
    jwt.verify(token, "bd268fd6f3494f36c8b3fc27ea5c5323e2fcd7b4f02ee4fd02d703562587bba365b8b2bb6a39701550dc598aed4c192e1eca46a16c31cbeec6f9f3e4fc6cabea", (err, user) => {
//      console.log("Process env access token secret is ",process.env.ACCESS_TOKEN_SECRET)	    
      console.log("Token in reports server is ",token)	    
      console.log(err)
      if (err) return res.status(403).send({message:"Forbidden"})
      req.user = user
//      console.log('authenticated token contains user  id ',req.user);
      next() // pass the execution off to whatever request the client intended
    })
}
module.exports = authenticateToken;
  
