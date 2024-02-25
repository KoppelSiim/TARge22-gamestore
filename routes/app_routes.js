const gamesController = require('../controllers/GamesController.js');

module.exports = (app) => {
    // Welcome message to my gamestore
    app.get("/", (req, res) => {
        res.send("Welcome to my games tore!");
    });
    app.route("/games")
        .get(gamesController.getAll);  // get all games id-s as list
    app.route("/gamenames")
        .get(gamesController.getAllGameNames); // get all game names
};