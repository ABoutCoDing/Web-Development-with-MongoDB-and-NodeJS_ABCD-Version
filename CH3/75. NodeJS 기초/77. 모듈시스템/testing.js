var worker = require('./dowork');

var something = 1;
var somethingElse = 2;

var newVal = worker.doWork(something, somethingElse);
console.log(newVal);