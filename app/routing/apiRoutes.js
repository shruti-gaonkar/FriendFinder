let friendData = require("../data/friends");
const choicesData = require("../data/choices");
const fs = require("fs");

module.exports = function (app) {
    // api call to get all the questions for the survey
    app.get("/api/choices", function (req, res) {
        res.send(choicesData);
    });

    // api call to get friends list
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    // api call to post data and find the closest match
    app.post("/api/friends", function (req, res) {
        let newFriend = req.body;
        let resultArr = [];
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        for (var i = 0; i < friendData.length; i++) {
            // to calculate the difference between the current user's
            // scores and each friend's scores
            const frdArr = friendData[i].scores;
            const diffArr = frdArr.map((val, index) => Math.abs(val - newFriend.scores[index]));

            // gets the sum of the difference of the scores
            // eg Total Difference: **2 + 1 + 2 =** **_5_**
            const diff = diffArr.reduce(reducer);

            // create a new array of all friends with the sum of difference
            resultArr.push({
                name: friendData[i].name,
                photo: friendData[i].photo,
                diff: diff
            });
        }

        // get the minimum value from the new array 'diff' property
        const retVal = Math.min.apply(Math, resultArr.map(function (o) { return o.diff; }))

        // if the minimum value matches with the 'diff' property return that array of matched friend
        const matchedFriend = resultArr.find(function (o) { return o.diff == retVal; })

        /* code to add current user to friends.js file */
        friendData.push(newFriend);

        let friendStr = 'var friendsArray =';
        friendStr += JSON.stringify(friendData);
        friendStr += '\nmodule.exports = friendsArray;';
        fs.writeFile("./app/data/friends.js", friendStr, function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "friends list was updated!"
            console.log("Friends list is updated!");

        });

        // return the matched friend to the function calling this api
        res.json(matchedFriend);
    });
}