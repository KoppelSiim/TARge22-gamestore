module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("Games", {
        userId: {
            type: Sequelize.INTEGER,
        },
        gameId: {
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
    }, {
        tableName: 'Games' 
    });
    
    // Game belongs to a user, and a game can have multiple purchases.
    Game.associate = (models) => {
        Game.belongsTo(models.User, { foreignKey: 'userId' });
        Game.hasMany(models.Purchase, { foreignKey: 'gameId' });
    };
    
    return Game;
};