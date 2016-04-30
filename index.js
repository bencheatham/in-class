
const app = require('./server/configuration.js');
const server = require('http').createServer(app);
const port = process.env.PORT || 8000;


var path = require('path');
var io = require(path.join(__dirname,'server/textStreamingService.js'))(server); //initialize chat server


// console.log(io);
// io.close(function () {console.log(io)});



if (module.parent) {
  module.exports = app; // so we can require in tests
} else {
  server.listen(port, () => { console.log('Server listening at port %d', port); });
}


process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) {console.log('\n...user ended'); process.exit();}
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
