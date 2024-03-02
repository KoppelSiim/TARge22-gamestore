const { db } = require('../db');
db.sequelize.sync();
const User = db.users;

// Get list of user Id-s
exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["userId"] });
        res.status(200).json(users);
    } catch (error) {
        console.error('users:', error);
        res.status(500).json({ error: 'cannot find  userid' });
    }
};

// Get base URL
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? 'https' : 'http') +
        `://${request.headers.host}`
    );
};