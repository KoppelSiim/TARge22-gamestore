module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userEmail: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        birthYear: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1900, 
                max: new Date().getFullYear()
            }
        },
        
    }, {
        tableName: 'Users' 
    });
    
    User.associate = (models) => {
        User.hasMany(models.Game, { foreignKey: 'userId' });
    };

    User.associate = (models) => {
        User.hasMany(models.Purchase, { foreignKey: 'userId' });
    };
    
    return User;
};