express = require('express')
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({message:"Not Authorized"}) // if there isn't any token
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      	if(err){
	console.log(err)
}
      if (err) return res.status(403).send({message:"Forbidden"})
      req.user = user
//      console.log('authenticated token contains user  id ',req.user);
      next() // pass the execution off to whatever request the client intended
    })
}
module.exports = authenticateToken;
  
