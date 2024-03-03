module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define("Purchase", {
        purchaseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        purchaseDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    });

    return Purchase;
};
