const fs = require('fs');

module.exports = (app) => {

  app.post('/save', (request, response) => {
    var data = request.body.data;
    var file = request.body.file;

// file must be a string
// data must be an object

    fs.writeFile(
      __dirname + '/../database/json/' + file + '.json', 
      JSON.stringify(data), 
      (error) => {
        if (error) { response.status(400).send('error: ' + error); }
        else { response.status(201).send('created'); }
      }
    ); 
        
  });

  app.get('/fetch', (request, response) => {
    var file = request.query.file;
// file must be a string
    fs.readFile(
      __dirname + '/../database/json/' + file + '.json', 
      (error, data) => {
        if (error) { response.status(400).send('error: ' + error); }
        else { response.status(200).send(data); }    
      }
    );
  });

};