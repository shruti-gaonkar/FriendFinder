var friendData = require("../data/friends");
var choicesData = require("../data/choices");

module.exports = function (app) {
    app.get("/api/choices", function (req, res) {
        res.send(choicesData);
    });

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {
        let newFriend = req.body;
        //console.log(newFriend);
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
            //console.log(diff);
            resultArr.push({
                name: friendData[i].name,
                photo: friendData[i].photo,
                diff: diff
            });
        }

        console.log(resultArr);
    });
}