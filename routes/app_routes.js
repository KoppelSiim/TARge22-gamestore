const gamesController = require('../controllers/GamesController.js')

module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll)     // get all games as list
        .post(gamesController.createNew) // create a new game
    app.route("/games/:id")     
        .get(gamesController.getById)    // get a game by id
        .put(gamesController.updateById) // change info of a game by id
        .delete(gamesController.deleteById) // delete a game by id

}