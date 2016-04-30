const fs = require('fs');

function fileExists (path) {
  return new Promise((resolve, reject) => {
    fs.fstat(path, (error, stats) => {
      if (error) reject(error);
      else resolve(stats.isFile());
    });
  })
  .catch((error) => Promise.resolve(false));
}

function fetchManifest () {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname + '/../database/json/', (error, files) => { 
      if (error) reject(error); 
      else resolve(files); 
    });
  })
  .then((files) => { console.log(files); return files; });
}

module.exports = (app) => {

  app.post('/save', (request, response) => {
    var data = request.body.data;
    var file = request.body.file;
    var update = request.body.update;
    var filePath = __dirname + '/../database/json/' + file + '.json';

// file must be a string
// data must be an object
    
    if (file === 'manifest') { response.status(400).send('error: ' + 'manifest is a reserved filename'); return void 0; }


    fileExists(filePath)
    .then((bool) => {
      if (!bool && !update) { response.status(400).send('error: ' + 'File name is not unique. Please use the update flag to overwrite.'); return void 0; }
      fs.writeFile(
        filePath, 
        JSON.stringify(data), 
        (error) => {
          if (error) response.status(400).send('error: ' + error);
          else response.status(201).send('created'); 
        }
      ); 
    });

        
  });

  app.get('/fetch', (request, response) => {
    var file = request.query.file;
// file must be a string

    if (file === 'manifest') { 
      fetchManifest()
      .then((files) => response.status(200).send(files));
      return void 0;
    }

    fs.readFile(
      __dirname + '/../database/json/' + file + '.json', 
      (error, data) => {
        if (error) response.status(400).send('error: ' + error);
        else response.status(200).send(data);
      }
    );
  });

};