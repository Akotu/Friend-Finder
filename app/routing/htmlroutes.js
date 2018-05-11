//require npm packages

var express = require("express");
var app = express();
var path = require("path");


module.exports = function(app) {
    //display home page
    app.get("/", function(request, response) {
        response.sendFile(path.join(__dirname, "/../public/home.html"));
    });
    //display survey page
    app.get("/survey", function(request, response) {
        response.sendFile(path.join(__dirname, "/../public/survey.html"));
    });
    //redirect to home page if no matching route is found
    app.get("*", function (request, response) {
        response.sendFile(path.join(__dirname, "/../public/home.html"));
    });
}