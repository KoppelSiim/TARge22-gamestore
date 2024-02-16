require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()
//const mariadb = require("mariadb")
const port = process.env.APP_PORT;
console.log(process.env.USER)
console.log(process.env.PASS)
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json())
app.use(cors())



/* const games = [
    {id: 1, name: "Team Fortress 2", price: "free", rating: 5},
    {id: 2, name: "Cyberpunk 2077", price: 69.99, rating: 3},
    {id: 3, name: "Paladins: Champions of the Realm", price: "free", rating: 4},
    {id: 4, name: "Super Mario Bros. Wonder", price: 69.99, rating: 5},
    {id: 5, name: "Sonic the Hedgehog", price: 1.99, rating: 4},
    {id: 6, name: "God of War 3", price: 29.99, rating: 4},
    {id: 7, name: "Half:Life", price: "free", rating: 5},
    {id: 8, name: "Portal", price: 2.99, rating: 5},
    {id: 9, name: "Goat Simulator", price: 12.99, rating: 3}    
] */

require("./routes/app_routes")(app)

app.get('/games/:id', (req, res) =>{
    if(typeof games[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Game not found"})
    }
    res.send(games[req.params.id - 1])
})

app.post('/games', (req, res) =>{

if (!req.body.name || !req.body.price || !req.body.rating) {
    return res.status(400).send({error: "One or all parameters are missing"})
}
let game = {
    id: games.length +1,
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating 
}
    games.push(game)

    res.status(201)
    .location(`${getBaseUrl(req)}/games/${games.length}`)
    .send(game)
})

app.delete('/games/:id', (req, res) =>{
    if(typeof games[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Game not found"})
    }
    games.splice(req.params.id -1, 1)
    res.status(204).send({error: "No Content"})
})

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, async () => {console.log(`API up at: http://localhost:${port}`)})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}