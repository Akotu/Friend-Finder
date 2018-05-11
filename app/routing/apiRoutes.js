var express = require("express");
var path = require("path");
var app = express();
// var petArray = require("../data/pets.js");


module.exports = function (app) {

  app.get("/api/pets", function (request, response) {
    var pets = require(path.join(__dirname, "../data/pets.js"));
    response.json(pets);
  });

  app.post("/api/pets", function (request, response) {
    var pets = require(path.join(__dirname, "../data/pets.js"));
    var newPet = request.body;

    var differences = [];
    var totalDifference = 0;
    var score = 0;

    for (var x = 0; x < pets.length; x++) {
      for (var i = 0; i < newPet.score.length; i++) {
        var difference = Math.abs(pets[x].score[i] - newPet.score[i]);
        totalDifference += difference;
        score++;
        if (score === 10) {
          var match = {
            petIndex: x,
            scoreDifference: totalDifference
          }
          differences.push(match);
          totalDifference = 0;
          score = 0;
        }
      }
    }


    console.log(JSON.stringify(differences));

    differences.sort(function (a, b) {

      return parseFloat(a.scoreDifference) - parseFloat(b.scoreDifference);

    });

    console.log("Best Match " + JSON.stringify(differences[0]));

    var bestMatchPetId = differences[0].petIndex;

    var bestMatch = pets[bestMatchPetId];

    pets.push(newPet);

    response.json(bestMatch);
  })

  
};
