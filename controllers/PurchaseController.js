const { db, Sync } = require('../db');
const Game = db.games;
const User = db.users;
const Purchase = db.purchases;

// Buy game feature
exports.buyGame = async (req, res) => {
    try {
        const { gameId, userId } = req.body;
        const game = await Game.findByPk(gameId);

        if (!game) {
            return res.status(404).json({ success: false, error: 'Game not found' });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const purchase = await Purchase.create({
            userId: user.id,
            gameId,
        });
        return res.status(201).json({ success: true, purchase });
    } catch (error) {
        console.error('Error buying game:', error);
        res.status(500).json({ success: false, error: 'Error creating the purchase in the database' });
    }
};