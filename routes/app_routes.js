const gamesController = require('../controllers/GamesController.js');

module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll);  // get all games as list
};