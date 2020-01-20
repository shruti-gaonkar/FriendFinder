const path = require("path");

module.exports = function (app) {
    // api call to send the contents of home.html file
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // api call to send the contents of survey.html file
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
}

