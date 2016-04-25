var app = require('./server/configuration.js');

var port = process.env.PORT || 8000;

if (module.parent) {
  module.exports = app; // so we can require in tests
} else {
  app.listen(port, () => { console.log('Server listening at port %d', port); });
}
