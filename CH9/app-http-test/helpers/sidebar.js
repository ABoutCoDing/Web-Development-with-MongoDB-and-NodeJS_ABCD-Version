var stats = require('./stats'),
    images = require('./images'),
    comments = require('./comments'),
    async = require('async');

module.exports = function(viewModel, callback) {
    async.parallel([
        function(next) {
            // next(null, stats());
            stats(next);
        },
        function(next) {
            // next(null, images.popular());
            images.popular(next);
        },
        function(next) {
            comments.newest(next);
        }
    ], function(err, results) {
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };
        callback(viewModel);
    });
};
