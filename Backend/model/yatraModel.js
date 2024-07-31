const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "yatra",
  {
    yatra_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: Sequelize.STRING,
    },
    contactNumber: {
      type: Sequelize.INTEGER,
    },
    eamil: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },

    dataOfBirth: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    emergencyContact: {
      type: Sequelize.STRING,
    },
    travelDates: {
      type: Sequelize.STRING,
    },
    mealPreference: {
      type: Sequelize.STRING,
    },
 
    specialRequirement: {
      type: Sequelize.STRING,
    },
    numberOfTravels: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);
