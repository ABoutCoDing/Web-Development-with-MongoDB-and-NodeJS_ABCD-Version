var mongoose = require('mongoose'), Scheme = mongoose.Schema;

var Account = new Scheme({
    username: {type: String},
    date_created: {type: Date, default: Date.now},
    visits: {type: Number, default: 0},
    active: {type: Boolean, deault: false}
});