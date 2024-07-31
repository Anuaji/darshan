const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define('userregister', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: Sequelize.STRING
    },
    lastnmae: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    phonenumber: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    emailid: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});
