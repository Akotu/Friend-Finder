var petArray = require("../data/pets.js");

module.exports = function(app) {
    app.get("/api/pets", function(req, res) {
        res.json(petArray);
    });
    app.post("/api/pets", function(req, res) {

        let petMatch = {
            name: '',
            photo: '',
            matchDiff: 50
        }
        let userData = req.body;

        for (value of petArray){

            let matchVal = 0;

            for (let i = 0; i < 10; i++){
                matchVal += Math.abs(parseInt(userData.scores[i]) 
                - parseInt(value.scores[i]));

                if (matchVal <= petMatch.matchDiff) {
                    petMatch.name = value.name;
                    petMatch.photo = value.photo;
                    petMatch.matchDiff = matchVal;
                }
            }
        }
        petArray.push(userData);
        
        res.json(petMatch);
    });
};