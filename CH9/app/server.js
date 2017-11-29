var express = require('express');
    config = require('./server/configure');
    app = express(),
    mongoose = require('mongoose');

module.exports = app;

process.env.NODE_ENV = 'test';  // or development

config.mongoURI = {
    development: 'mongodb://localhost/imgPloadr',
    test: 'mongodb://localhost/imgPloadr-test'
};

mongoose.connect(config.mongoURI[app.settings.env], { useMongoClient: true }, function(err, res) {
    mongoose.connection.on('open', function(){
        console.log('Mongoose connected.');
    });  
});
mongoose.Promise = global.Promise;


app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});