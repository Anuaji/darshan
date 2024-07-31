const Sequelize = require("sequelize");
const db = require("../database/sequalize");

module.exports = db.sequelize.define(
    "Temple_Event", {
        temple_eventid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        event_name: {
            type: Sequelize.STRING,
        },
        event_startdate: {
            type: Sequelize.DATE,
        },
        event_enddate: {
            type: Sequelize.DATE,
        },
        event_timing: {
            type: Sequelize.TIME,
        },
        description: {
            type: Sequelize.STRING,
        },
        registration: {
            type: Sequelize.STRING,
        },
        temple_name: {
            type: Sequelize.STRING,
        },
        temple_country: {
            type: Sequelize.STRING,
        },
        temple_state: {
            type: Sequelize.STRING,
        },
        temple_district: {
            type: Sequelize.STRING,
        },
        temple_city: {
            type: Sequelize.STRING,
        },
        contact_details: {
            type: Sequelize.STRING,
        },
        Temple_Eventcol: {
            type: Sequelize.INTEGER,
        },
        created_date: {
            type: Sequelize.DATE,
        },
        created_by: {
            type: Sequelize.STRING,
        },
        is_active: {
            type: Sequelize.STRING,
        },
    }, { timestamps: false }
);