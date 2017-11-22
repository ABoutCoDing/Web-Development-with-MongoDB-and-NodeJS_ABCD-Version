// 실행되지 않는 스니펫(snippet) 코드 

mongoose.connect('');
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose");
});