let friendData = require("../data/friends");
const choicesData = require("../data/choices");
const fs = require("fs");

module.exports = function (app) {
    app.get("/api/choices", function (req, res) {
        res.send(choicesData);
    });

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {
        let newFriend = req.body;
        let resultArr = [];
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        for (var i = 0; i < friendData.length; i++) {
            const frdArr = friendData[i].scores;
            //console.log(frdArr);
            /*frdArr.forEach(function (val, index) {
                let diff = val - newFriend.scores[index];
            });*/
            const diffArr = frdArr.map((val, index) => Math.abs(val - newFriend.scores[index]));

            const diff = diffArr.reduce(reducer);

            resultArr.push({
                name: friendData[i].name,
                photo: friendData[i].photo,
                diff: diff
            });
        }

        //const retVal = resultArr.reduce((min, p) => p.diff < min ? p.diff : min, resultArr[0].diff);
        //console.log(resultArr);
        const retVal = Math.min.apply(Math, resultArr.map(function (o) { return o.diff; }))

        const matchedFriend = resultArr.find(function (o) { return o.diff == retVal; })

        friendData.push(newFriend);

        let friendStr = 'var friendsArray =';
        friendStr += JSON.stringify(friendData);
        friendStr += '\nmodule.exports = friendsArray;';
        fs.writeFile("./app/data/friends.js", friendStr, function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "movies.txt was updated!"
            console.log("Friends list is updated!");

        });

        res.json(matchedFriend);
    });
}