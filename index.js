require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.APP_PORT;
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

// Import db.js object
const { db } = require('./db'); 
app.use(express.json());
app.use(cors());
const appRoutes = require("./routes/app_routes");
appRoutes(app);

// Sync models with the database
async function syncDatabase() {
    try {
        await db.sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

// Start the server
async function startServer() {
    await syncDatabase();
    app.listen(port, () => {
        console.log(`API up at: http://localhost:${port}`);
    });
}

startServer();

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`;
}