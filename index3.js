var express=require("express");
var bodyParser=require('body-parser');
 
var conn = require('./config');
var app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use("images", express.static(__dirname + "/public/images"));
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
   res.redirect('/Home.html') 
})

app.get('*', function(req, res){
	res.redirect('/Home.html')
})
 
app.get('/Home.html', function(req, res){
	res.sendFile("Home.html");
})

app.get('/login.html', function (req, res) {  
   res.sendFile( "login.html" );  
})  

app.get('/signup.html', function(req, res){
	res.sendFile("signup.html");
})


app.post('/signup', function(req, res){
	conn.query("INSERT INTO users VALUES (?, ?, ?);", [req.body.email, req.body.username, req.body.password], function(error, results, fields){
		if(error){
			console.log(error);
			res.json({
				success: false
			});
		} else {
			res.json({
				success: true
			})
		}
	});

});

app.post('/login', function(req, res){
	conn.query("SELECT * FROM users WHERE email=?", req.body.email, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		if(error){
			success = false;
			message = "Unknown error occured"
		} else {
			//console.log(results.length > 0 && body.username == results[0].Username && body.password == results[0].Password);

			if(results.length > 0){

				if(body.username == results[0].Username){

					if(body.password == results[0].Password){

						success = true;
						message = "success"
					}else{
						success = false;
						message = "password does not match";
					}
				}else{
					success = false;
					message = "invalid username";
				}
			}else{
				success = false;
				message = "Email ID does not exist";
			}
			/*
			You will receive the output of the query in the variable results as an array.
			You also have the data from the form in the varible body. Make sure you console.log() to understand the format.
			TODO:
			1. Make sure the results array has length greater than 0.
			2. If the length is greater than 0, check for the username received in the request.
			3. If the username is correct, check for the password received in the request.
			4. If everything checks out, assign success as TRUE and message as "Success".
			5. If it fails the check at any point, assign success as FALSE and message as the reason it failed. 
				e.g: "Username does not match", "Email ID does not exist", etc.  
			*/

		}
	res.json({
				success: success,
				message: message
			});
	})

})


app.listen(3000);