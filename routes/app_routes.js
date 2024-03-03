const gamesController = require('../controllers/GamesController.js');
const usersController = require('../controllers/UsersController.js');
const purchaseController = require('../controllers/PurchaseController.js');

module.exports = (app) => {
    // Welcome message to my gamestore
    app.get("/", (req, res) => {
        res.send("Welcome to my games tore!");
    });
    app.route("/games")
        .get(gamesController.getAll)  // get all games id-s as list
        .post(gamesController.createNew); // add a new game
    app.route("/gamenames")
        .get(gamesController.getAllGameNames); // get all game names
    app.route("/gamegenres")
        .get(gamesController.getAllGameGenres); // get all game genres
    app.route("/game/:gameId/price")
        .get(gamesController.getGamePriceById); // get game price by ID
    app.route("/users")
        .get(usersController.getAll)
        .post(usersController.createNewUser); 
    app.route("/purchase/game/:gameId").post(purchaseController.buyGame);
};