// 실행되지 않음 

mongoose.connect('');
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose");
});