var request = require('request');

module.exports = function() {
    request('http://google.com', function (err, res, body) {
        console.log(body);
    });
}