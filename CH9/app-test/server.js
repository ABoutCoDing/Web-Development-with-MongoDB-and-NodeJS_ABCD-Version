var express = require('express');
config = require('./server/configure');
app = express(),
mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/imgPloadr', { useMongoClient: true });
mongoose.connection.on('open', function(){
    console.log('Mongoose connected.');
});
mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});