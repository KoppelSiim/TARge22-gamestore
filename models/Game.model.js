module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("Games", {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users', 
                key: 'userId'  
            }
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

    Game.associate = (models) => {
        Game.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Game;
};