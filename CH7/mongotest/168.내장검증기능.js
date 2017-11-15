var mongoose = require('mongoose'), 
Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongotest', { useMongoClient: true });
mongoose.connection.on('open', function() {
    console.log('Mongoose connected');
});

var Account = new Schema({
    username: {type: String, required: true},
    date_created: {type: Date, default: Date.now},
    visits: {type: Number, default: 0},
    active: {type: Boolean, default: false},
    age: {type: Number, required: true, min: 13, max: 120}
});

var AccountModel = mongoose.model('Account', Account);
var newUser = new AccountModel({username: 'randomUser1', age: 11});
newUser.validate(function(err) {
    console.log(err);
})
newUser.save();