require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.APP_PORT;
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json());
app.use(cors());

const appRoutes = require("./routes/app_routes");
appRoutes(app);

// ... other configurations ...

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
});

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`;
}