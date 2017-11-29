var express = require('express'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    json = require('./movies.json'),
    app = express(),
    request = require('request');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.set(bodyParser.urlencoded()) // deprecated

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3500);


var router = new express.Router();
app.use('/', router);


// get
// router.get('/test', function(req, res) {
//     var data = {
//         name: 'Jamie Han',
//         website: 'http://abcds.kr'
//     };
//     res.json(data);
// });

// router.get('/', function(req, res) {
//     res.json(json);
// });


// post
// router.post('/', function(req, res) {
//     console.log(req.body)
//     if (req.body.Id && req.body.Title &&  req.body.Director && req.body.Year && req.body.Rating) {
//         json.push(req.body);
//         res.json(json);
//     } else {
//         // res.json(500, {error: 'There was an error!'});   // deprecated
//         res.status(500).json({error: 'There was an error!'});
//     }
// });


// put
router.put('/:id', function(req, res){
    console.log(req.params.id)
    if (req.params.id && req.body.Title && req.body.Director && req.body.Year && req.body.Rating) {
        console.log(json)
        _.each(json, function(elem, index) {
            if (elem.Id == req.params.id) { 
                elem.Title = req.body.Title;
                elem.Director = req.body.Director;
                elem.Year = req.body.Year;
                elem.Rating = req.body.Rating;
            }
        });
        res.json(json);
    } else {
        // res.json(500, {error: 'There was an error!'});
        res.status(500).json({error: 'There was an error!'});
    }
}); 


// delete 
// router.delete("/:id", function(req, res) {
//     var idnexToDel = -1;
//     _.each(json, function(elem, index) {
//         if (elem.Id === req.params.id) {
//             indexToDel = index;
//         }
//     }); 
//     if (~indexToDel) {
//         json.splice(indexToDel, 1);
//     }
//     res.json(json);
// })


router.get('/external-api', function(req, res) {
    request({
        method: 'GET',
        url: 'http://localhost:' + (process.env.PORT || 3500)
    }, function(error, response, body) {
        if (error) {throw error;}

        var movies = [];
        _.each(JSON.parse(body), function(elem, index) {
            movies.push({
                Title: elem.Title,
                Rating: elem.Rating
            });
        });
        res.json(_.sortBy(movies, 'Rating').reverse());
    });
});


// router.get('/imdb', function(req, res) {
//     request({
//         method: 'GET',
//         url: 'http://sg.media-imdb.com/suggests/a/aliens.json'
//     }, function(err, response, body) {
//         var data = body.substring(body.indexOf('(')+1);
//         data = JSON.parse(data.substring(0, data.length-1));
//         var related = [];
//         _.each(data.d, function(movie, index) {
//             related.push({
//                 Title: movie.l,
//                 Year: movie.y,
//                 Poster: movie.i ? movie.i[0] : ''
//             });
//         });
//         res.json(related);
//     });
// });



var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});