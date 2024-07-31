const { Sequelize } = require("../database/db")

module.exports = (sequelize, sequelize) => {
    const vendors = sequelize.define("vendors",{
        vendorphonenumber:{
            type: Sequelize.INTEGER
        }
    });
    return vendors;
}