const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "vendors",
  {
    vendor_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vendorType: {
      type: Sequelize.STRING,
    },
    vendor_name: {
      type: Sequelize.STRING,
    },
    business_name: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    // country_code_id:{
    //   type: Sequelize.STRING,
    // },
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
    password: {
      type: Sequelize.STRING,
    },
    pincode: {
      type: Sequelize.STRING,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
    },
    post: {
      type: Sequelize.INTEGER,
    },
    isApproved: {
      type: Sequelize.INTEGER,
    },
    rejectReasonByAdmin: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);
