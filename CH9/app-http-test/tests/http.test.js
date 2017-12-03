var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var fs = require('fs');

var Schema = mongoose.Schema;

chai.use(chaiHttp);

describe('HTTP 테스트 #2', function() {
    it('/ GET은 인덱스가 출력될거야.', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            }
        );
    });

    it('/images/1 GET 은 개별 이미지의 정보가 출력될거야', function(done) {
        chai.request(server)
            .get('/images/1')
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            }
        );
    });
    
    it('/images POST 는 하나의 이미지 등록', function(done) {
        chai.request(server)
            .post('/images')
            .send({'title': 'title', 'description': 'description'})
            .attach('file', fs.readFileSync('public/upload/1mr95z.jpg'), '1mr95z.jpg')
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/images/1/like 이미지 1번에 좋아요', function(done) {
        chai.request(server)
            .post('/images/1/like')
            .end(function(err, response){
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('likes');
                done();
            });
    });


    it('/images/1 이미지 1을 삭제 한다.', function(done) {
        chai.request(server)
            .delete('/images/1')
            .end(function(error, response){
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                done();
            });
    });
});