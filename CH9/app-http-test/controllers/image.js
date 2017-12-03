var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar')
    Models = require('../models')
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        var viewModel = {
            image: {},
            comments: []
        }
        
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function(err, image) {
                if (err) {throw err;}
                if (image) {
                    image.views = image.views + 1;
                    viewModel.image = image;
                    image.save();

                    Models.Comment.find({image_id: image._id}, {}, {sort: {'timestamp': 1}},
                        function(err, comments) {
                            if (err) { throw err; }
                            
                            viewModel.comments = comments;
                            
                            sidebar(viewModel, function(viewModel) {
                                res.render('image', viewModel);
                            });
                        }
                    );
                } else {
                    res.redirect('/');
                }
            }
        );
    },
    create: function(req, res) {
        var saveImage = function() {
            var possible = 'abcdefghijklmnopqrsntuvwxyz0123456789',
                imgUrl = '';
            
            for(var i=0; i<6; i+=1) {   
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            Models.Image.find({filename: imgUrl}, function(err, images) {
                if (images.length > 0) {
                    saveImage();
                } else {
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
                            // res.redirect('images/' + imgUrl);
                            var newImg = new Models.Image({
                                title: req.body.title,
                                description: req.body.description,
                                filename: imgUrl + ext
                            });
                            newImg.save(function(err, image) {
                                console.log('Successfully inserted image: ' + image.filename);
                                res.redirect('/images/' + image.uniqueId);
                            })
                        });
                    } else {
                        fs.unlink(tempPath, function(err){
                            if (err) throw err;
                            res.json(500, {error: 'Only image files are allowed.'});
                        });
                    }
                }
            });  
        };
        saveImage();
    },
    like: function(req, res) {
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function(err, image) {
                if (!err && image) {
                    image.likes = image.likes + 1;
                    image.save(function(err) {
                        if (err) {
                             res.json(err);
                        } else {
                            res.json({likes: image.likes});
                        }
                    });
                }
            }
        );
    },
    comment: function(req, res) {
        // res.send('The image:comment POST controller');
        Models.Image.findOne({filename: {$regex: req.params.image_id }},
            function(err, image) {
                if(!err && image ) {
                    var newComment = new Models.Comment(req.body);
                    newComment.gravatar = md5(newComment.email);
                    newComment.image_id = image._id;
                    newComment.save(function(err, comment) {
                        if (err) { throw err;}
                        res.redirect('/images/' + image.uniqueId + '#' +comment._id);
                    });
                } else {
                    res.redirect('/');
                }
            }
        );
    },
    remove: function(req, res) {
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function(err, image) {
            if(err) throw err;

            fs.unlink(path.resolve('./public/upload/' + image.filename), function(err){
                if (err) throw err;
                Models.Comment.remove({image_id: image._id}, function(err) {
                    image.remove(function(er) {
                        if(!err) {
                            res.json(true);
                        } else {
                            res.json(false);
                        }
                    });
                });
            });
        });
    }
};