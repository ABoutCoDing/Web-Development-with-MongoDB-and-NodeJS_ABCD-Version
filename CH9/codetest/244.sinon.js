var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
chai.use(sinonChai);

var object = {
    sumFunction : function(a, b) {
        return a + b;
    },
    doWork : function() {
        var x = 1,
            y = 2;
        console.log(this.sumFunction(x, y));
    }
}

// 244 page #1
// describe('doWork', function() {
//     var sum;

//     it ('should call sum', function() {
//         sum = sinon.spy(object, "sumFunction");
//         object.doWork();
//         expect(sum).to.be.calledWith(1, 2);
//     });
// });

// 244 page #2
// describe('doWork', function() {
//     var sum;
//     console.log = sinon.spy(console.log);
//     it ('should call sum', function() {
//         sum = sinon.spy(object, "sumFunction");
//         object.doWork();
//         expect(sum).to.be.calledWith(1, 2);
//         expect(console.log).to.be.calledWith(3);
//     });
// });

// 245 page
// describe('doWork', function() {
//     it ('should console.log sum response', function() {
//         var stub = sinon.stub(object, "sumFunction");
//         stub.returns(2);
//         console.log = sinon.spy(console.log);
//         object.doWork();
//         expect(console.log).to.be.calledWith(2);    //  calledWith - sinon-chai
//     });
// });