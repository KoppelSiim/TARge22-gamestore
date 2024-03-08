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

exports.createNewUser = async (req, res) => {
    console.log(req.body)
    let user
    try {
        user = await User.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid input"})
        } else {
            console.log("UsersCreate ", error)
            res.status(500).send({"error":"server error, try again later"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/users/${user.id}`)
        .json(user)
}

// Update user by id
exports.updateUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User with this id not found' });
        }

       
        await user.update(req.body);
        const updatedUser = await Game.findByPk(userId);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        res.status(500).json({ error: 'Error updating user' });
    }
};

exports.deleteUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        return res.status(204).send(); 
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        res.status(500).json({ error: 'Error deleting user' });
    }
};
// Get base URL
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? 'https' : 'http') +
        `://${request.headers.host}`
    );
};