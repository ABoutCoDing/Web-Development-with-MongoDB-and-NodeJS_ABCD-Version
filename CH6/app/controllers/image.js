var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar');

module.exports = {
    index: function(req, res) {
        var viewModel = {
            image: {
                uniqueId: 1,
                title: 'Sample Image 1',
                description: 'This is a sample',
                filename: 'sample1.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now()
            },
            comments: [
                {
                    image_id: 1,
                    email: 'test@testing.com',
                    name: 'Test Tester',
                    gravatar: 'http://lorempixel.com/75/75/animals/1',
                    comment: 'This is a test comment...',
                    timestamp: Date.now()
                }, {
                    image_id: 2,
                    email: 'test@testing.com',
                    name: 'Test Tester',
                    gravatar: 'http://lorempixel.com/75/75/animals/2',
                    comment: 'Another followup comment!',
                    timestamp: Date.now()
                }
            ]
        }

        // res.render('image', viewModel);
        sidebar(viewModel, function(viewModel) {
            res.render('image', viewModel);
        });
    },
    create: function(req, res) {
        var saveImage = function() {
            var possible = 'abcdefghijklmnopqrsntuvwxyz0123456789',
                imgUrl = '';
            
            for(var i=0; i<6; i+=1) {   
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            /*
            { fieldname: 'file',
            originalname: '22552718_1490336681021797_8488391384462488038_n.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: '/NodeJS/CH6/app/server/public/upload/temp',
            filename: 'e83e1d7d98f301906acdf70088846566',
            path: '/NodeJS/CH6/app/server/public/upload/temp/e83e1d7d98f301906acdf70088846566',
            size: 81794 }
            */
            var tempPath = req.file.path,
                ext = path.extname(req.file.originalname).toLowerCase(),
                targetPath = path.resolve('./public/upload/' + imgUrl + ext);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                fs.rename(tempPath, targetPath, function(err) {
                    if(err) throw err;
                    res.redirect('images/' + imgUrl);
                });
            } else {
                fs.unlink(tempPath, function(err){
                    if (err) throw err;
                    res.json(500, {error: 'Only image files are allowed.'});
                });
            }
        };
        saveImage();
    },
    like: function(req, res) {
        res.json({likes: 1});
    },
    comment: function(req, res) {
        res.send('The image:comment POST controller');
    }
};