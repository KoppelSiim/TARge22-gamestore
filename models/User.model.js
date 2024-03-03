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
    
    //User has many Game instances, and the association is established using the hasMany method.
    //The foreignKey: 'userId' option indicates that the userId field in the User model will be used as the foreign key in the Game model
    //to establish the relationship.
    
    User.associate = (models) => {
        User.hasMany(models.Game, { foreignKey: 'userId' });
        User.hasMany(models.Purchase, { foreignKey: 'userId' });
    };
    
    return User;
};