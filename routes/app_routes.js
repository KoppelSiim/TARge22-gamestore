const gamesController = require('../controllers/GamesController.js');

module.exports = (app) => {
    // Welcome message to my gamestore
    app.get("/", (req, res) => {
        res.send("Welcome to my games tore!");
    });
    app.route("/games")
        .get(gamesController.getAll);  // get all games as list
    /*app.route("/games/:id")     
        .get(gamesController.getById)    // get a game by id*/
};