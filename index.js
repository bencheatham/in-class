
const app = require('./server/configuration.js');
const server = require('http').createServer(app);
const port = process.env.PORT || 8000;


var path = require('path');
require(path.join(__dirname,'server/textStreamingService.js'))(server); //initialize chat server


if (module.parent) {
  module.exports = app; // so we can require in tests
} else {
  server.listen(port, () => { console.log('Server listening at port %d', port); });
}
