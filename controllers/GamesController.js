const { db } = require('../db');
db.sequelize.sync();
const Game = db.games;

// Get list of games
exports.getAll = async (req, res) => {
    try {
        const games = await Game.findAll({ attributes: ["gameid"] });
        res.status(200).json(games);
    } catch (error) {
        console.error('Error retrieving games:', error);
        res.status(500).json({ error: 'Total bs' });
    }
};
// Get base URL
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? 'https' : 'http') +
        `://${request.headers.host}`
    );
};