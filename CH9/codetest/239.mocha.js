var expect = require('chai').expect;
describe('The code', function() {
    beforeEach(function(){
        
    });
    afterEach(function(){
        
    });


    it ('should test somthing', function(){
        var something = 1;
        expect(something).to.exist;
    });

    it ('should test something_else', function(){
        var something_else = false;
        expect(something_else).to.equal(false);
    });
});