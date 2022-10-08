const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUserAuth = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
   return res.status(401).send({message:"Please login first"});
  }

  const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
       return res.status(401).send({message:"Something went wrong, please login again"});
      } else {
        req.body.userId = decoded.userId; 
        req.body.username = decoded.username;
        console.log("auth-middleware reqBody: ", req.body); 
        next();
      }
    });
  }

module.exports = { checkUserAuth };
