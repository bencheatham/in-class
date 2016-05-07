
const db = require('./database.js')();
const dbTest = require('./database.js')('test');

db.initialize(true, () => dbTest.initialize(true, () => console.log('done')));

