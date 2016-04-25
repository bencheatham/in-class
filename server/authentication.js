var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');


var secret = 'when in class... do as the students do';
exceptions = ['/', '/login', '/signup', '/app.js','/jquery.min.js'];



module.exports = function initializeJWTApp (app) {
  app.use(expressJWT({secret: secret}).unless({path: exceptions}), function (err,req, res, next) {
	  if (err.name === 'UnauthorizedError') {
	    res.status(400).send('invalid token...');
	  } else {
	  	next();
	  }
  });
} 


