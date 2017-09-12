//Require mongoose

var mongoose = require ("mongoose");

//Create Schema class
var Schema = mongoose.Schema;

//Create article schema

var ArticleSchema = new Schema({

	// title is a required string


	title:{
		type:String,
		trim: true
	},
//link is a required  string
	link:{
		type:String,
		trim: true
	},
//Saves note's ObjectId that refers to the Note model
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"

	}
});

//Create the Article model with the ArticleSchema

var Article = mongoose.model("Article", ArticleSchema);

//Export the model

module.exports = Article;