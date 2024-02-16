module.exports = (sequelize,Sequelize) => {
    const Influencer = sequelize.define("Influencer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        onlinename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        personname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isactive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: false
        },
        sociallink: {
            type: Sequelize.STRING,
            allowNull: true
        },
        imagelink: {
            type: Sequelize.STRING,
            allowNull: true
        },
    })
    return Influencer
}