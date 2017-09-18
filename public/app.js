//Grab the articles as a json

$.getJSON ("/articles", function(data){

	//For each one 
	for (var i = 0; i < data.length; i ++){

		//Display the apropos information on the page

		$ ("#articles").append ("<p data-id'" + data [i]._id + "'>" + data [i].title + "<br />" + data[i].link + "</p>");
	}
});

//In time of clicking p tag

$(document).on ("click", "p", function(){

//Empty the notes from the note section

$ ("#notes").empty();

//Save the id from the p tag

var thisId = $(this).attr ("data-id");
 

 //Make an AJAX call for the articles

 $.ajax ({

 	method:"GET",
 	url:"/articles" + thisId
 })

//Add the note information to the page using .done function

.done (function(data){
	console.log(data);

	//The title of the article

$("#notes").append("<h2>" + data.title + "</h2>");

//Input to enter a new title

$("#notes").append("<input id= 'titleinput' name = 'title'>");

//Textarea to add a new note body
$("#notes").append("<textarea id= 'bodyinput' name = 'body'></textarea>");

//Submit button for a new note, with the id of the article saved to input

$("#notes").append("<button data-id= ' " + data._id + " ' id= 'savenote'> Save Note </button>");

//If there is a Note in the article

if (data.note){

//Place the title of the note in the title input 

$ ("#titleinput").val(data.note.title);

//Place the body of the note in the body textarea

$("#bodyinput").val (data.note.body)

}

});


});


//Click the savenote button

$(document).on ("click", "#savenote", function(){

//Grab the id associated with the article from the submit button

var thisId = $(this).attr ("data-id");

//Run a POST request to change the note, using what is entered in the inputs

$.ajax({

	method: "POST",
	url: "/articles/" + thisId,
	data: {
		//Value taken from the title input

		title: $ ("#titleinput").val(),

		//Value taken from note textarea

		body :$ ("#bodyinput").val()
	}
})

//.done() function

.done(function(data){

	//Log the response
	console.log(data);

	//Empty the notes section

	$("#notes").empty();

});

//Remove the values entered in the input and textarea for note entry

$("#titleinput").val("");
$("# bodyinput").val("");

});