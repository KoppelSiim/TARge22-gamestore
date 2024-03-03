const { db } = require('../db');
db.Sequelize.sync();
const { Purchase, User, Game } = require('../db');



// Get base URL
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? 'https' : 'http') +
        `://${request.headers.host}`
    );
};
