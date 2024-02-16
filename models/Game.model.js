module.exports = (sequelize,Sequelize) => {
    const Game = sequelize.define("Game", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        rating: {
            type: Sequelize.INTEGER,            
            allowNull: true
        },
    })
    return Game
}