// Dependencies
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mongoose = require ("mongoose");

// Requiring  Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

//Scrapping tools
var cheerio = require ("cheerio");
var request = require ("request");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Set up the Express App
var app = express();


// Configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false }));


//Make a public a static dir
app.use(express.static("public"));


//Database  configuration with mongoose
mongoose.connect("mongodb://localhost/techdb");
// Hook mongoose connection to db
var db = mongoose.connection;


// Log any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// GET request to scrape the echojs website

app.get ("/scrape", function(req, res){

	//Grab the body of the html with request

request("https://www.http://techcrunch.com", function (error, response, html) {

	//Load cheerio and save it to jquery for a shorthand selector

  var $ = cheerio.load(html);


//Grab <h2> within an article tag, and do the following:

  $(".block-content").each(function(i, element){


console.log($(this).children(".post-title").text());
console.log($(this).children(".excerpt").text());


//Save an empty result object

    var result = {};

//Add the text and href of every link, and save them as properties of the result object

    
    result.title = $(this).children(".post-title").text();;
    result.link = $(this).children("a").attr("href");


//Using Article model, create a new entry

//This effectively passes the result object to the entry (and the title and body)

    var entry = new Article(result);
  

      //Save to Mongodb

      entry. save (function(err,doc){
        if(err){

        	 console.log(err);
        	 
                  }else{
                    console.log(doc);
                  }
      });

      });
});

//Tell the browser that we finished scraping the text

res.send ("Shamsur, Scraping is successfully finished!");

});

//Get the articles we scraped from the Mongodb

app .get ("/articles", function (req, res){

	//Grab every doc in the Arictles array

  Arictle.find({},function (error, doc){

  	//Log any errors 

    if (error){
      console.log(error);
// Or send the doc to the browser as a json object

    }else{

        res.json(doc);
    }
  });
});

//Grab an article using objectId
app.get ("/articles/:id", function(req, res){

//Using the id passed in the id parameter, prepare a query that finds the matching one in Database................

Article.findOne({"_id":req.params.id})

//.......and populate all of the notes associated with it

.populate("note");

//Now, execute the query

exec(function(error, doc) {

//Log any errors

if (error){
	console.log(error);
}else{
	res.json(doc);

}

});

});

	//Create a new note or replace an existing note

app.post ("/articles/:id", function(req,res){

	//Create a new note and pass the req.body to the entry

	var newNote = new Note(req.body);


	//Save the new note the db

	newNote.save (function(error, doc){

		//Log any errors

		if (error){

			console.log(error);
			}else{

				//Use the article id to find and update the note

				Article.findOneAndUpdate({"_id":req.params.id}, {"note":doc. _id})

					//Execute the above query

					exec(function(err, doc){

						if (err){
							console.log(err);

						}else{
							res.send(doc);
						}
					});

			}
	});

});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
// var PORT = process.env.PORT || 3000;

// app.use (bodyParser.json());
