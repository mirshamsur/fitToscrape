'use strict';

var bodyParser= require("body-parser");
var express = require("express");
var logger = require("morgan");
var mongoose = require ("mongoose");

// Requiring  Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

//Scraping tools

var cheerio = require ("cheerio");
var request = require ("request");

function scrape(){
  request("https://techcrunch.com", function(error, response, html){

    //Load into cheerio and save it to jquery for a shorthand selector
    var $ = cheerio.load(html);


    //Grab every <h2> within an article tag, and do the following:

    $(".block-content").each (function(i, element){

     // Console.log ($(this).children(".post-title").text());
       console.log($(this).children(".excerpt").text());

//Element.children.filter((child) => child.name == 'h2').forEach((child) =>{
      //console.log('CHILD', child);
    //})
    
//Save an empty result object
var result ={};
   // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

router.get ("/",function (req, res){
  Article.find ({}, function (err, doc){
    if (err){
      console.log (err);
          }else{
            res.render("index",{article:doc});
          }
  });
});

router.get ("/scrape", function(req, res){
request("https://www.http://edm.com/articles", function (error, response, html) {
  var $ = cheerio.load(html);
  $(".read").each(function(i, element){
    var result = {};
    var little =$(this).children("h2").text();
    var text =$(this).children("p").text();

    result.title = title;
    result.text = text;

    var entry = new Article(result);
    if (title && text){
      //Save to Mongodb
      entry. save (function(err,doc){
        if(err){
          console.log(err);
                  }else{
                    console.log(doc);
                  }
      });

    }


  });
});
res.send ("Successful!");

});
//Get from Mongodb

router.get ("/articles", function (req, res){
  Arictle.find({},function (error, doc){
    if (error){
      console.log(error);

    }else{
      console.log(doc);
      res.json(doc);
    }
  });
});




