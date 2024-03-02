const { db } = require('../db');
db.sequelize.sync();
const Game = db.games;

// Get list of gameId-s
exports.getAll = async (req, res) => {
    try {
        const games = await Game.findAll({ attributes: ["gameid"] });
        res.status(200).json(games);
    } catch (error) {
        console.error('Error retrieving games:', error);
        res.status(500).json({ error: 'Cannot find gameid' });
    }
};
// Get a list of all game names or throw error
exports.getAllGameNames = async (req, res) =>{
    try{
        const games = await Game.findAll({attributes: ["name"]});
        res.status(200).json(games);
    } catch (error){
        console.error('Cannot get list of game names');
        res.status(500).json({error:'Cannot find game name'});
    }
};

// Get a list of all game genres or throw error
exports.getAllGameGenres = async (req, res) => {
    try{
        const games = await Game.findAll({attributes: ["genre"]});
        res.status(200).json(games);
    } catch(error){
        console.error('Cannot find game genre');
        res.status(500).json({error: 'Cannot find game genre'});
    }
};

// Get the price of a game by its ID or throw an error
exports.getGamePriceById = async (req, res) => {

    // get game id from request params
    const {gameId} = req.params;

    try {
        // find the price by gameId
        const game = await Game.findByPk(gameId, { attributes: ["price"] });
        // game is found
        if (game) {
            res.status(200).json({ price: game.price });
        } else {
            // not found
            res.status(404).json({ error: 'Game with this id not found' });
        }
    } catch (error) {
        console.error(`Error retrieving game price for ID ${gameId}:`, error);
        // internal server error 500
        res.status(500).json({ error: 'Cannot retrieve game price' });
    }
};

exports.createNew = async (req, res) => {
    console.log(req.body)
    let game
    try {
        game = await Game.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid input"})
        } else {
            console.log("GamesCreate ", error)
            res.status(500).send({"error":"server error, try again later"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/games/${game.id}`)
        .json(game)
}
// Get base URL
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? 'https' : 'http') +
        `://${request.headers.host}`
    );
};