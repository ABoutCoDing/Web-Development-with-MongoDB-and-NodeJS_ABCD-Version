/* global global, require */
/* jshint expr: true, camelcase: false, unused: vars */
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    assert = chai.assert;

global.expect = chai.expect;
global.sinon = sinon;
global.assert = assert;
chai.use(sinonChai);
