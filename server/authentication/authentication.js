var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');


var secret = 'when in class... do as the students do';
var exceptions = [/*'/',*/ '/auth/index.html', '/auth/app.js','/login', '/signup', '/app.js', '/vendors.js', '/bundle.js'];



module.exports = function initializeJWTApp (app) {
  app.use(
    function extendHeaderWithAuthCookie(req, res, next) {
      // extend the headers with the authorization cookie 
      var auth = req.cookies.authorization;
      // replace '%20' with ' ' to reverse the url encoding
      if (typeof auth === 'string' && auth.slice(6,9) === '%20') { auth = auth.slice(0,6) + ' ' + auth.slice(9); }
      req.headers.authorization = auth;
      next();
    },
    expressJWT({secret: secret}).unless({path: exceptions}), 
    function handleUnauthorizedError(err,req, res, next) {
  	  if (err.name === 'UnauthorizedError') {
  	    res.status(400).send('invalid token...');
  	  } else {
  	  	next();
  	  }
    }
  );
}; 


