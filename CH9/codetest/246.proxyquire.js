var sinon = require('sinon'),
    chai = require('chai');
    sinonChai = require('sinon-chai'),
    expect = chai.expect,
    assert = chai.assert,
    proxyquire = require('proxyquire');

chai.use(sinonChai);

var requestStub = sinon.stub().callsArgWith(1, null, null, 'google.com'),
    google = proxyquire('./google', {'request': requestStub});

describe('google module', function() {
    beforeEach(function() {
        google();
    });
    it ('should log google body', function() {
       expect(requestStub).to.be.called;
    });
});