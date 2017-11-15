var stats = require('./stats'),
    images = require('./images'),
    comments = require('./comments');

module.exports = function(viewModel, callback) {
    viewModel.sidebar = {
        stats: stats(),
        popular: images.popular(),
        comments: comments.newest(0)
    };
    callback(viewModel);
}
