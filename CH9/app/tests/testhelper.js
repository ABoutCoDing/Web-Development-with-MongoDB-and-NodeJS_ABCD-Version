var chai = require('chai')
var chaiHttp = require('chai-http');
var server = require('../server');

chai.use(chaiHttp);

global.chai = chai;
global.chaiHttp = chaiHttp;
global.server = server;