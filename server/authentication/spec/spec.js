
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;
chai.use(chaiAsPromised);



describe('Authentication Unit Tests', function() {
  beforeEach(function (done) {
    done();
  });

  it('should be true', function() {
    expect(1).to.equal(1);
  });
});