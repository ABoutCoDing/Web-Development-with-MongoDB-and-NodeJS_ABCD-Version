var chai = require('chai');
var should = require('should');
var expect = chai.expect;
var assert = chai.assert;
var animals = {pets: ['dog', 'cat', 'mouse']};
var foo = 'bar';

describe('doWork', function() {
    it ('test', function() {
        expect(foo).to.be.a('string').and.equal('bar');
        expect(animals).to.have.property('pets').with.length(3);
        animals.should.have.property('pets').with.length(3);
        assert.equal(foo, 'bar', 'Foo equal bar');
    });
});