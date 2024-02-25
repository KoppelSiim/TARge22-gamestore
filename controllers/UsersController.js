const { db } = require('../db');
db.sequelize.sync();
const User = db.users;



// Get base URL
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? 'https' : 'http') +
        `://${request.headers.host}`
    );
};