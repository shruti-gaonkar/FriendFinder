const express = require("express");

const PORT = process.env.PORT || 8080;

const apiRoutes = require("./app/routing/apiRoutes");
const htmlRoutes = require("./app/routing/htmlRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});