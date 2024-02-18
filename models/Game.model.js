module.exports = (sequelize,Sequelize) => {
    const Game = sequelize.define("Game", {
        gameid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,            
            allowNull: false
        },
    })
    return Game
}