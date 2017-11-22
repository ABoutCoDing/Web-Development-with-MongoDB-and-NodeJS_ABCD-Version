$ npm install --save express body-parser underscore


body-parser deprecated undefined extended: provide extended option server.js:9:20

app.use(bodyParser.urlencoded({
    extended: true
}));


express deprecated res.json(status, obj): Use res.status(status).json(obj) instead server.js:39:13