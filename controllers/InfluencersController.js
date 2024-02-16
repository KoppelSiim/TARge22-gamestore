const {db} = require('../db')
const Influencer = db.influencers

//get list of influencers
exports.getAll =  async (req, res) => {
    const influencers = await Influencer.findAll({attributes:["onlinename"]})
    res.send(influencers)
}

exports.getById = async (req, res) => {
    const influencer = await Influencer.findByPk(req.params.id)
    if (influencer === null) {
        res.status(404).send({"error": "Influencer not Found"})
    }
    res.send(influencer)
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") +
        `://${request.headers.host}`
    )
}