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

  app.post("/api/friends", function(req, res) {
      var match = {
        name: "",
        photo: "",
        difference: 1000
      };

      // need logic to do the following
        // Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
        // With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.


        // Example: 


        // User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]

        // User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]

        // Total Difference: 2 + 1 + 2 = 5


            // Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on. 
            // The closest match will be the user with the least amount of difference.



            // Once you've found the current user's most compatible friend, display the result as a modal pop-up.


            // The modal should display both the name and picture of the closest match.

        console.log(req.body);

        var user = req.body;
        var score = user.scores;
        var theDifference;

        for (var i = 0; i < friendsData.length; i++) {
            var friendData = friendsData[i];
            console.log(friendData);
            theDifference = 0;

            for (var j = 0; j < score.length; j++) {
                var eachScore = score[j];
                theDifference += Math.abs(eachScore - friendData.eachScore);

            if (match.difference >= theDifference) {
                match.name = friendData.name;
                match.photo = friendData.photo;
                match.difference = theDifference;
                }
            }
        }

        friendsData.push(user);
        res.json(match);

    });
  };