const fs = require('fs');
const jwt = require('jsonwebtoken');
const secret = 'when in class... do as the students do';

function verifyUsername (request, response) {
  var auth = request.headers.authorization; 
  var token = auth ? auth.slice(7) : '';
  // console.log(token);
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) reject(error);
      if (!payload) reject(error);
      else resolve(payload.username);
    });
  })
  .catch((error) => error);
}

function makeDirectory (path) {
  return new Promise((resolve, reject) => {
    console.log('make directory');
    fs.mkdir(path, (error, folder) => {
      if (error) reject(error);
      resolve(true);
    });
  });
  // let errors fall through to a later catch    
}

function directoryExists (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) reject(error);
      else resolve(stats.isDirectory());
    });
  })
  .catch((error) => {console.log(error); Promise.resolve(false);});  
}

function fileExists (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) reject(error);
      else resolve(stats.isFile());
    });
  })
  .catch((error) => Promise.resolve(false));
}

function fetchManifest (username) {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname + '/../database/json/' + username, (error, files) => { 
      if (error) reject(error); 
      else resolve(files); 
    });
  })
  .catch((error) => []);
}

module.exports = (app) => {

  app.post('/save', (request, response) => {
    var data = request.body.data;
    var file = request.body.file;
    var update = request.body.update;

    console.log(file);

    verifyUsername(request,response)
    .then((username) => {
      var directory = __dirname + '/../database/json/' + username + '/';
      var filePath = directory + file + '.json';

      console.log('directory: ', directory);

  // file must be a string
  // data must be an object
      
      if (file === 'manifest') { response.status(400).send('error: ' + 'manifest is a reserved filename'); return void 0; }

      directoryExists(directory)
      .then(function (bool) {
        console.log('directory exists: ', bool);
        if (!bool) return makeDirectory(directory);
        return true;
      })
      .then((bool) => { console.log('created', bool); return fileExists(filePath);})
      .then((bool) => {
        console.log('file exists', bool);
        if (bool && !update) { response.status(400).send('error: ' + 'File name is not unique. Please use the update flag to overwrite.'); return void 0; }
        fs.writeFile(
          filePath, 
          JSON.stringify(data), 
          (error) => {
            if (error) response.status(400).send('error: ' + error);
            else response.status(201).send('created'); 
          }
        ); 
      });


    })
    .catch((error) => response.status(400).send('error: ' + 'invalid token...'));



        
  });

  app.get('/fetch', (request, response) => {
    var file = request.query.file;
// file must be a string

    verifyUsername(request,response)
    .then((username) => {
      if (file === 'manifest') { 
        fetchManifest(username)
        .then((files) => response.status(200).send(files));
        return void 0;
      }

      fs.readFile(
        __dirname + '/../database/json/'+ username + '/' + file + '.json', 
        (error, data) => {
          if (error) response.status(400).send('error: ' + error);
          else response.status(200).send(data);
        }
      );
    })
    .catch((error) => response.status(400).send('error: ' + 'invalid token...'));

  });

};