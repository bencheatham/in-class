var axios = require('axios');

console.log('run axios');

axios.get('http://localhost:8000')
.then(function (response) { console.log(response); })
.catch(function (response) { console.log(response); });


axios.post('http://localhost:8000/text', {text: 'hello world'})
.then(function (response) { console.log(response); })
.catch(function (response) { console.log(response); });

