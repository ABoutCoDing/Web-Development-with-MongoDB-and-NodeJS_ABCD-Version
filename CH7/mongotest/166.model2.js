var mongoose = require('mongoose'), 
Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongotest', { useMongoClient: true });
mongoose.connection.on('open', function() {
    console.log('Mongoose connected');
});

var Account = new Schema({
    username: {type: String},
    date_created: {type: Date, default: Date.now},
    visits: {type: Number, default: 0},
    active: {type: Boolean, default: false},
    age: {type: Number, default: 0}
});

var AccountModel = mongoose.model('Account', Account);
var newUser1 = new AccountModel({username: 'randomUser1', age: 21});
var newUser2 = new AccountModel({username: 'randomUser2', age: 25});
var newUser3 = new AccountModel({username: 'randomUser3', age: 18});
var newUser4 = new AccountModel({username: 'randomUser4', age: 32});

newUser1.save();
newUser2.save();
newUser3.save();
newUser4.save();

AccountModel.find({age: {$gt: 18, $lt: 30}}, function(err, accounts) {
    console.log(accounts.length); 
    console.log(accounts[0].username);
    mongoose.connection.close();
});