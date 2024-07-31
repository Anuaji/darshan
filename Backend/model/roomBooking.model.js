const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "room_Booking",
  {
    rooBooking_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: Sequelize.INTEGER,
    },
    fullName: {
      type: Sequelize.STRING,
    },
    contactNumber: {
      type: Sequelize.INTEGER,
    },
    email: { // Corrected from eamil to email
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    emergencyContact: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    numberOfTravels: {
      type: Sequelize.STRING,
    },
    numberOfRooms: {
      type: Sequelize.STRING,
    },
    country_id: {
      type: Sequelize.INTEGER,
    },
    state_id: {
      type: Sequelize.INTEGER,
    },
    district_id: {
      type: Sequelize.INTEGER,
    },
    city_id: {
      type: Sequelize.INTEGER,
    },
    area_id: {
      type: Sequelize.INTEGER,
    },
    checkIn_out: {
      type: Sequelize.STRING,
    },
    medicalInfo: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);