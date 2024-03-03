const { db } = require('../db');
db.sequelize.sync();
const { Game, User, Purchase } = require('../db');

exports.buyGame = async (req, res) => {
    try {
        // get the gameId
        const { gameId } = req.params; 
        // find the game
        const game = await Game.findByPk(gameId);
        // game not found
        if (!game) {
            return res.status(404).json({ success: false, error: 'Game not found' });
        }
        // get the userId
        const{userId} = req.body;
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({success:false, error: 'User not found'});
        }

        // Buy the game
        const purchase = await Purchase.create({
            userId: req.user.id, 
            gameId,
        });

        return res.status(201).json({ success: true, purchase });
    } catch (error) {
        console.error('Error buying game:', error);
        res.status(500).json({ success: false, error: 'Error creating the purchase in the database' });
    }
};

// Get base URL
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? 'https' : 'http') +
        `://${request.headers.host}`
    );
};
