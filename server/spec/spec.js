
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;
chai.use(chaiAsPromised);
var axios = require('axios');

describe('Server Unit Tests', function() {
  beforeEach(function (done) {
    done();
  });

  it('should respond with landing page', function() {
    return expect(
      axios.get('http://localhost:8000')
      .then(function (res) { return Promise.resolve(res.status); })
    ).to.eventually.equal(200);
  });
  
});
