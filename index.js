


// connect sql

var mysql = require ('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',		//CHANGE YOUR PASSWORD HERE
    database : 'CungChow118w'
})
//check connection error
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database", err);
    }
});

//connection variables
var express = require("express");
var bodyParser = require('body-parser');

var conn = connection;
var app = express();
app.use(express.static("Public"));


var path = require('path');
var router = express.Router();
var fs = require('fs');

// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/Public/Home.html'))
});

app.get('/reservation.html', function(req, res){
    res.sendFile(path.join(__dirname + "reservation.html"))
})
app.get('/order.html', function(req, res){
    res.sendFile(path.join(__dirname + "order.html"))
})
app.get('/payment.html', function(req, res){
    res.sendFile(path.join(__dirname + "payment.html"))
})


app.post('/reservation', function(req, res){
    var body = req.body;

    conn.query("INSERT INTO Reservation VALUES (?, ?, ?, ?, ?, ?, ?);", [null, body.name, body.date, body.time, body.phone, body.party_size, body.email], function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            console.log(body.name);
        }
    })
})

var total;
app.post('/order', function(req, res){
    var body = req.body;
    console.log("order index");
    console.log(body);
    total = body.total;
})

app.post('/payment', function(req, res){
    var body = req.body;
    conn.query("INSERT INTO Orders VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);", [null, total, body.name, body.email, body.address, body.city, body.state, body.zip, body.cname, body.card, body.expmonth, body.expyear, body.cvv], function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            console.log(body.name);
        }
    })
    console.log("payment total: " + total);
    console.log(body);
})

app.listen(3000);

