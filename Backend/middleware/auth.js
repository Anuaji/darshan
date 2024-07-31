//Import jsonwebtoken
const jwt = require("jsonwebtoken");

require('dotenv').config();

//Authurization checking
const commonAuth = function(req, res, next) {
  // const token = req.header("token");

  // if (!token) return res.status(401).json({ message: "Auth Error" });

  // try {
  //   const decoded = jwt.verify(token, "randomString");
  //   req.user = decoded.user;
  //   next();
  // } catch (e) {
  //   console.error(e);
  //   res.status(500).send({ message: "Invalid Token" });
  // }
  if(!req.headers.Authorization){
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.Authorization.split(' ')[1];
   
  if(token ==='null'){
   return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token,process.env.SECRET_KEY);
   if(!payload){
     return res.status(401).send('Unauthorized request')
   }
   req.userId = payload.subject;
   next();
};

module.exports = {commonAuth};