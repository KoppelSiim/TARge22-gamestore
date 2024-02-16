const {db} = require('../db');
const Game = db.games

// get list of games
exports.getAll = async (req, res) => {
    const games = await Game.findAll({attributes:["name"]})
    res.send(games)
}

// get specific game by id
exports.getById = async (req, res) => {
    const games = await Game.findByPk(req.params.id)
    if (games === null) {
        res.status(404).send({"error":"Game not found"})
        return
    }
    res.send(games)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    let game
    try {
        game = await Game.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid input"})
        } else {
            console.log("GamesCreate ", error)
            res.status(500).send({"error":"server error, try again later"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/games/${game.id}`)
        .json(game)
}

exports.updateById = async (req, res) => {
    let result
    delete (req.body.id)
    try {
        result = await Game.update(req.body, {where: {id: req.params.id}})
    } catch (error) {
        console.log("GamesUpdate: ", error)
        res.status(500).send({"error":"server error, try again later"})
        return
    }
    if (result === 0 || result === undefined) {
        res.status(404).send({"error":"Game not found"})
        return
    }
    const game = await Game.findByPk(res.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/games/${game.id}`)
        .json(game)
}

exports.deleteById = async (req,res) => {
    let result
    try {
        result = await Game.destroy({ where: { id: req.params.id}})
    } catch (error) {        
        console.log("GamesCreateDelete ", error)
        res.status(500).send({"error":"server error, try again later"})
        return
    }
    if (result === 0 || result === undefined) {
        res.status(404).send({"error":"Game not found"})
        return
    }
    res.status(204).send()
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") +
        `://${request.headers.host}`
    )
}