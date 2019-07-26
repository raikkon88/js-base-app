// middleware.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {

  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Your request hasn't got authentication header."});
  }
  
  var token = req.headers.authorization.split(" ")[1];

  try{
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    if(payload.exp <= moment().unix()) {
      return res
        .status(401)
          .send({message: "Token Expired"});
    }
    
    req.user = payload.sub;
    next();
  }
  catch{
    return res
        .status(403)
          .send({message: "Invalid token"});
  }
  
}