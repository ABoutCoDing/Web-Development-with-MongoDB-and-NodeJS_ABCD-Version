var mongoose = require('mongoose'), 
Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongotest', { useMongoClient: true });
mongoose.connection.on('open', function() {
    console.log('Mongoose connected');

    var AccountSchema = new Schema({
        username: String,
    
        firstname: String,
        lastname: String,
    });
    
    var AccountModel = mongoose.model('Account', AccountSchema);
    var newUser = new AccountModel({username: 'random', firstname: 'random', lastname: 'user'});
    
    AccountSchema.virtual('fullname')
    .get(function() {
        console.log('virtual');
        return this.firstname + ' ' + this.lastname;
    })
    .set(function(fullname) {
        var parts = fullname.spilt(' ');
        this.firstname = parts[0],
        this.lastname = parts[1]
    })
    console.log(newUser.fullname)
    console.log(newUser.toObject({virtuals: true}).fullname);
});