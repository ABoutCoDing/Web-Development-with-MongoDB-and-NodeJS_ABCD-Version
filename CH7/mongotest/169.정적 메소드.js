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

Account.statics.findByAgeRange = function(min, max, callback) {
    this.find({age: {$gt: min, $lte: max} }, callback);
};

var AccountModel = mongoose.model('Account', Account);

AccountModel.findByAgeRange(18, 30, function(err, accounts) {
    console.log(accounts.length);
});