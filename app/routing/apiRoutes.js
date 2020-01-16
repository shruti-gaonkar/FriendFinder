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
        //friendData.push(newFriend);
        //res.json(true);
    });
}