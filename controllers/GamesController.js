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

// Get base URL
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? 'https' : 'http') +
        `://${request.headers.host}`
    );
};