var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var findResult = 0;


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var dropProducts = function (db, callback) {
    db.collection('products').drop(function (err, results) {
        console.log(results);
        callback();
    });
};

var insertDocument = function (db, cart, total) {
    var mid = JSON.stringify(cart);
    mid.replace(/\\/g, '');
    db.collection('orders').insertOne({
            "cart": mid,
            "total": total
        }
        , function (err, result) {
            console.log("Inserted a document into the restaurants collection.");
        });
};

var findUser = function (db, token) {
    findResult = 0;
    var cursor = db.collection('users').find({"token": token});
    cursor.each(function (err, doc) {
        if (doc != null) {
            findResult++;
        }
    });
};


var products = {
    'KeyboardCombo': {
        price: getRandomInt(25, 35),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/KeyboardCombo.png'
    },
    'Mice': {
        price: getRandomInt(5, 7),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/Mice.png'
    },
    'PC1': {
        price: getRandomInt(300, 350),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/PC1.png'
    },
    'PC2': {
        price: getRandomInt(350, 400),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/PC2.png'
    },
    'PC3': {
        price: getRandomInt(330, 380),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/PC3.png'
    },
    'Tent': {
        price: getRandomInt(30, 40),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/Tent.png'
    },
    'Box1': {
        price: getRandomInt(5, 7),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/Box1.png'
    },
    'Box2': {
        price: getRandomInt(5, 7),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/Box2.png'
    },
    'Clothes1': {
        price: getRandomInt(20, 30),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/Clothes1.png'
    },
    'Clothes2': {
        price: getRandomInt(20, 30),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/Clothes2.png'
    },
    'Jeans': {
        price: getRandomInt(30, 40),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/Jeans.png'
    },
    'Keyboard': {
        price: getRandomInt(15, 25),
        quantity: getRandomInt(900, 1000),
        url: 'https://cpen400a.herokuapp.com/images/Keyboard.png'
    }
};

app.get('/products', function (request, res) {

    var token = request.headers.authorization;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    MongoClient.connect('mongodb://127.0.0.1:27017/UBCBookStore', function (err, db) {

        if (err) throw err;
        console.log("Connected to Database");

        findUser(db, token);
        setTimeout(function () {
            if (findResult > 0) {
                console.log('Authorization Passed');
                db.collection("products", function (err, collection) {
                    if (err) throw err;
                    else {
                        collection.find({}).toArray(function (err, docs) {
                            if (err) throw  err;
                            else {
                                res.header("Access-Control-Allow-Origin", "*");
                                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                                res.json(docs);
                            }
                        });
                    }
                });
            } else {
                res.status(404).send("Authorization Failed");
            }
            findResult = 0;
        }, 2000);
    });
});


app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});

app.post('/checkpoint', function (req, res) {

    var tokenCheck = req.headers.authorization;

    if (req.method == 'POST') {

        var database;
        var newdatabase = {};
        var postresult;
        var cart = {};
        var total = 0;
        var jsonString = '';


        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            postresult = JSON.parse(jsonString);
            MongoClient.connect('mongodb://127.0.0.1:27017/UBCBookStore', function (err, db) {
                if (err) throw err;

                findUser(db, tokenCheck);
                setTimeout(function () {
                    if (findResult > 0) {
                        console.log('Authorization Passed');
                        for (var result in postresult) {
                            if (result !== 'total') {
                                cart[result] = postresult[result];
                            } else {
                                total = postresult[result];
                            }
                        }

                        db.collection("products", function (err, collection) {
                            if (err) throw err;
                            else {
                                collection.find({}).toArray(function (err, docs) {
                                    if (err) throw  err;
                                    else {
                                        database = docs[0];
                                        for (var obj in database) {
                                            if (obj !== "_id") {
                                                newdatabase[obj] = {};
                                                newdatabase[obj].price = database[obj].price;
                                                newdatabase[obj].quantity = database[obj].quantity - cart[obj];
                                                newdatabase[obj].url = database[obj].url;
                                            }
                                        }
                                        dropProducts(db, function () {
                                        });
                                        db.collection('products').insert(newdatabase, function (err) {
                                            if (err) throw err;
                                        })
                                    }
                                });
                            }
                        });
                        insertDocument(db, cart, total);
                        res.end('{"success" : "Updated Successfully", "status" : 200}');
                    }
                    else {
                        res.status(404).send("Authorization Failed");
                    }
                    findResult = 0;
                }, 2000);
            });
        });
    }
});

