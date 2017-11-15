var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/mongotest', function(err, db) {
        console.log('몽고DB 접속 성공')

        var collection = db.collection('testing')

        collection.insert({'title': 'Snowcrash'}, function(err, docs) {
            // { result: { ok: 1, n: 1 },
            // ops: [ { title: 'Snowcrash', _id: 5a0ac2e595ed63351c24f74b } ],
            // insertedCount: 1,
            // insertedIds: [ 5a0ac2e595ed63351c24f74b ] }
            // console.log(docs);
            console.log(docs.ops.length + ' record inserted.');
            console.log(docs.ops[0]._id + ' - ' + docs.ops[0].title) ;
            collection.findOne({
                title: 'Snowcrash',
            }, function(err, doc) {
                console.log(doc._id + ' - ' + doc.title);
                db.close();
            })

            
        })
    }
);

