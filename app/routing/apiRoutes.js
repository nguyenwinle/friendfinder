// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================
var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post('/api/friends', function(req,res){
    var friendScores = req.body.scores;
    var theScores = [];
    var bestMatch = 0;

    //runs through all current friends in list
    for(var i = 0; i < friendsData.length; i++){
      var friendData = friendsData[i];
      var theDiff = 0;
      //run through scores to compare friends
      for(var j = 0; j< friendScores.length; j++){
        var friendScore = friendScores[j];
        theDiff += (Math.abs(friendData.scores[j]) - friendScore);
      }

      //push results into scores array
      theScores.push(theDiff);
    }

    //after the friends are compared, find best match
    for(var i = 0; i < theScores.length; i++){
        var score = theScores[i];
      if(score <= theScores[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var match = friendsData[bestMatch];
    res.json(match);

    //pushes new submission into the friendsList array
    friendsData.push(req.body);
  });
};