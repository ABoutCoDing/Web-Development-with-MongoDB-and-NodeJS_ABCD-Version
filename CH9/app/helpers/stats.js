var models = require('../models'),
    async = require('async');

module.exports = function(callback) {
    async.parallel([
        function(next) {
            models.Image.count({}, next);
        },
        function(next) {
            models.Comment.count({}, next);
        },
        function(next) {
            models.Image.aggregate({ $group: {
                _id: true,
                viewsTotal: {$sum: '$views'}
            }}, function(err, result) {
                var viewTotal = 0;
                if (result != null && result.length > 0) {
                    viewTotal += result[0].viewsTotal;
                }
                next(null, viewTotal);
            });
        },
        function(next) {
            models.Image.aggregate({$group: {
                _id: true,
                likesTotal: {$sum: '$likes'}
            }}, function(err, result) {
                var likesTotal = 0;
                if(result != null && result.length > 0) {
                    likesTotal += result[0].likesTotal;
                }
                next(null, likesTotal);
            });
        }
    ], function(err, results) {
        callback(null, {
            images: results[0],
            comments:results[1],
            views: results[2],
            likes: results[3]
        });
    });
};